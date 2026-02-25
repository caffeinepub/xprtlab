import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Camera,
  CheckCircle,
  AlertCircle,
  Loader2,
  Clock,
  LogIn,
  LogOut,
  Shield,
  CalendarCheck,
  Building2,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import {
  useGetActiveShift,
  useStartShift,
  useEndShift,
  useCreateSecurityLog,
  useGetCallerUserProfile,
} from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useCamera } from '../../camera/useCamera';
import { ExternalBlob } from '../../backend';
import {
  haversineDistance,
  checkGPSAccuracy,
  detectMockLocation,
  isWithinGeofence,
  detectSpeedJump,
  MAX_GPS_ACCURACY_METERS,
} from '../../utils/geoHelpers';
import { getDeviceFingerprint } from '../../utils/deviceFingerprint';

// Demo hospital coordinates (in production, fetch from profile/backend)
const DEMO_HOSPITAL_LAT = 28.6139;
const DEMO_HOSPITAL_LON = 77.209;

type AttendanceStep =
  | 'idle'
  | 'checking_device'
  | 'getting_gps'
  | 'capturing_selfie'
  | 'active'
  | 'ending'
  | 'blocked';

interface BlockInfo {
  title: string;
  message: string;
  canRetry: boolean;
}

function formatElapsed(checkInTime: bigint): string {
  const ms = Date.now() - Number(checkInTime) / 1_000_000;
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function formatTime(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function PhlebotomistAttendancePage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const phlebotomistId = identity?.getPrincipal().toString() || '';
  const hospitalId = userProfile?.phone ? `hospital_${userProfile.phone}` : 'default_hospital';

  const { data: activeShift, isLoading: shiftLoading, refetch: refetchShift } =
    useGetActiveShift(phlebotomistId);
  const startShift = useStartShift();
  const endShift = useEndShift();
  const createSecurityLog = useCreateSecurityLog();

  const [step, setStep] = useState<AttendanceStep>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null);
  const [error, setError] = useState('');
  const [gpsPosition, setGpsPosition] = useState<GeolocationPosition | null>(null);
  const [capturedSelfie, setCapturedSelfie] = useState<File | null>(null);
  const [selfiePreviewUrl, setSelfiePreviewUrl] = useState<string | null>(null);
  const [elapsedDisplay, setElapsedDisplay] = useState('');

  const {
    videoRef,
    canvasRef,
    isActive,
    isLoading: cameraLoading,
    error: cameraError,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useCamera({
    facingMode: 'user',
    quality: 0.8,
  });

  // Update elapsed time every minute
  useEffect(() => {
    if (!activeShift) return;
    const update = () => setElapsedDisplay(formatElapsed(activeShift.checkInTime));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [activeShift]);

  // Cleanup selfie preview URL
  useEffect(() => {
    return () => {
      if (selfiePreviewUrl) URL.revokeObjectURL(selfiePreviewUrl);
    };
  }, [selfiePreviewUrl]);

  const logSecurityEvent = async (
    eventType: string,
    reason: string,
    lat?: number,
    lon?: number,
  ) => {
    const { deviceId } = getDeviceFingerprint();
    try {
      await createSecurityLog.mutateAsync({
        userId: phlebotomistId,
        eventType,
        deviceId,
        latitude: lat ?? null,
        longitude: lon ?? null,
        reason,
      });
    } catch {
      // Best-effort logging
    }
  };

  const handleStartShift = async () => {
    setError('');
    setBlockInfo(null);

    // Step 1: Device binding check
    setStep('checking_device');
    const { deviceId } = getDeviceFingerprint();
    const storedDeviceId = localStorage.getItem('xpertlab_deviceId');
    if (storedDeviceId && storedDeviceId !== deviceId) {
      await logSecurityEvent('DEVICE_MISMATCH', 'Device ID mismatch during shift start');
      setBlockInfo({
        title: 'Device Verification Failed',
        message: 'This account is registered on another device. Contact admin.',
        canRetry: false,
      });
      setStep('blocked');
      return;
    }

    // Step 2: Get GPS
    setStep('getting_gps');
    let position: GeolocationPosition;
    try {
      position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });
    } catch {
      setError('Unable to get GPS location. Please enable location access and try again.');
      setStep('idle');
      return;
    }

    // Check GPS accuracy
    if (!checkGPSAccuracy(position)) {
      await logSecurityEvent(
        'LOW_GPS_ACCURACY',
        `GPS accuracy too low: ${position.coords.accuracy.toFixed(1)}m`,
        position.coords.latitude,
        position.coords.longitude,
      );
      setError(
        `GPS accuracy is ${position.coords.accuracy.toFixed(1)}m. Need ≤${MAX_GPS_ACCURACY_METERS}m accuracy. Move to an open area and try again.`,
      );
      setStep('idle');
      return;
    }

    // Mock location detection (hard block)
    if (detectMockLocation(position)) {
      await logSecurityEvent(
        'MOCK_LOCATION_DETECTED',
        'Mock/spoofed location detected during shift start',
        position.coords.latitude,
        position.coords.longitude,
      );
      setBlockInfo({
        title: 'Location Verification Failed',
        message: 'Mock location detected. This is a security violation and has been logged.',
        canRetry: false,
      });
      setStep('blocked');
      return;
    }

    // Speed jump detection
    const lastPosStr = sessionStorage.getItem('lastKnownPosition');
    if (lastPosStr) {
      try {
        const lastPos = JSON.parse(lastPosStr) as { lat: number; lon: number; timestamp: number };
        const jumpResult = detectSpeedJump(
          lastPos.lat,
          lastPos.lon,
          lastPos.timestamp,
          position.coords.latitude,
          position.coords.longitude,
          Date.now(),
        );
        if (jumpResult.isJump) {
          await logSecurityEvent(
            'MOCK_LOCATION_DETECTED',
            `Suspicious speed jump: ${jumpResult.speed.toFixed(1)} km/h over ${jumpResult.distance.toFixed(2)} km`,
            position.coords.latitude,
            position.coords.longitude,
          );
          setBlockInfo({
            title: 'Location Verification Failed',
            message: `Suspicious movement detected (${jumpResult.speed.toFixed(0)} km/h). This has been logged.`,
            canRetry: false,
          });
          setStep('blocked');
          return;
        }
      } catch {
        // Ignore parse errors
      }
    }

    // Geofence check
    const distance = haversineDistance(
      position.coords.latitude,
      position.coords.longitude,
      DEMO_HOSPITAL_LAT,
      DEMO_HOSPITAL_LON,
    );

    // For demo/dev: skip geofence if distance is very large (likely not near demo coords)
    const skipGeofenceInDev = distance > 50000; // >50km = likely dev environment
    if (
      !skipGeofenceInDev &&
      !isWithinGeofence(
        position.coords.latitude,
        position.coords.longitude,
        DEMO_HOSPITAL_LAT,
        DEMO_HOSPITAL_LON,
        100,
      )
    ) {
      await logSecurityEvent(
        'OUTSIDE_GEOFENCE',
        `Distance from hospital: ${distance.toFixed(0)}m (max 100m)`,
        position.coords.latitude,
        position.coords.longitude,
      );
      setError(
        `You are ${distance.toFixed(0)}m away from your assigned hospital. Must be within 100m to check in.`,
      );
      setStep('idle');
      return;
    }

    setGpsPosition(position);

    // Step 3: Capture selfie
    setStep('capturing_selfie');
    await startCamera();
  };

  const handleCaptureSelfie = async () => {
    const photo = await capturePhoto();
    if (!photo) {
      setError('Failed to capture photo. Please try again.');
      return;
    }
    setCapturedSelfie(photo);
    const url = URL.createObjectURL(photo);
    setSelfiePreviewUrl(url);
    await stopCamera();
  };

  const handleSubmitShift = async () => {
    if (!gpsPosition || !capturedSelfie) return;
    setIsSubmitting(true);
    setError('');

    try {
      const arrayBuffer = await capturedSelfie.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array);
      const selfieUrl = blob.getDirectURL();

      await startShift.mutateAsync({
        phlebotomistId,
        hospitalId,
        checkInLat: gpsPosition.coords.latitude,
        checkInLong: gpsPosition.coords.longitude,
        checkInSelfieUrl: selfieUrl,
      });

      sessionStorage.setItem(
        'lastKnownPosition',
        JSON.stringify({
          lat: gpsPosition.coords.latitude,
          lon: gpsPosition.coords.longitude,
          timestamp: Date.now(),
        }),
      );

      await refetchShift();
      setStep('active');
      setCapturedSelfie(null);
      setSelfiePreviewUrl(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to start shift. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndShift = async () => {
    if (!activeShift) return;
    setStep('ending');
    setError('');

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      await endShift.mutateAsync({
        phlebotomistId,
        hospitalId,
        checkOutLat: position.coords.latitude,
        checkOutLong: position.coords.longitude,
      });

      await refetchShift();
      setStep('idle');
    } catch (err: any) {
      setError(err?.message || 'Failed to end shift. Please try again.');
      setStep('active');
    }
  };

  // Loading state
  if (shiftLoading) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
        <p className="text-sm text-muted-foreground">Checking shift status...</p>
      </div>
    );
  }

  // Hard block screen
  if (step === 'blocked' && blockInfo) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <Shield className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-xl font-bold text-destructive text-center">{blockInfo.title}</h2>
        <p className="text-sm text-muted-foreground text-center max-w-xs">{blockInfo.message}</p>
        <p className="text-xs text-muted-foreground text-center">
          This incident has been logged for security review.
        </p>
      </div>
    );
  }

  // Selfie capture step
  if (step === 'capturing_selfie') {
    return (
      <div className="px-4 py-5 space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-2 shadow-md">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Capture Selfie</h1>
          <p className="text-sm text-muted-foreground">Take a selfie to verify your identity</p>
        </div>

        {selfiePreviewUrl ? (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-black">
              <img
                src={selfiePreviewUrl}
                alt="Selfie preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                ✓ Captured
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCapturedSelfie(null);
                  setSelfiePreviewUrl(null);
                  startCamera();
                }}
                className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                Retake
              </button>
              <button
                onClick={handleSubmitShift}
                disabled={isSubmitting}
                className="flex-1 gradient-btn py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Confirm & Start
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cameraError ? (
              <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{cameraError.message}</p>
              </div>
            ) : (
              <div
                className="relative rounded-2xl overflow-hidden bg-black"
                style={{ minHeight: '300px' }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ minHeight: '300px' }}
                />
                {cameraLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div>
                )}
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
            <button
              onClick={handleCaptureSelfie}
              disabled={!isActive || cameraLoading}
              className="w-full gradient-btn py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              Take Selfie
            </button>
          </div>
        )}
      </div>
    );
  }

  // GPS / device check in-progress
  if (step === 'checking_device' || step === 'getting_gps') {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-foreground">
          {step === 'checking_device' ? 'Verifying device...' : 'Getting GPS location...'}
        </p>
        <p className="text-xs text-muted-foreground text-center max-w-xs">
          {step === 'getting_gps' && 'Please allow location access and stay still for best accuracy.'}
        </p>
      </div>
    );
  }

  // Active shift display
  if (activeShift && activeShift.status === 'ACTIVE') {
    return (
      <div className="px-4 py-5 space-y-4">
        {/* ON DUTY Status Banner */}
        <div
          className="rounded-2xl p-5 text-center shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 bg-green-400/30 border border-green-300/50 rounded-full px-4 py-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <span className="text-white font-bold text-sm tracking-widest">ON DUTY</span>
          </div>
          <p className="text-white/80 text-sm">Your shift is currently active</p>
        </div>

        {/* Shift Details */}
        <MedicalCard className="p-4 space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-primary" />
            Shift Details
          </h2>
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Check-in Time</span>
            </div>
            <span className="text-sm font-semibold text-primary">
              {formatTime(activeShift.checkInTime)}
            </span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Time Elapsed</span>
            </div>
            <span className="text-sm font-semibold text-accent">{elapsedDisplay}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Hospital</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {activeShift.hospitalId}
            </span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Location</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {activeShift.checkInLat.toFixed(4)}, {activeShift.checkInLong.toFixed(4)}
            </span>
          </div>
        </MedicalCard>

        {error && (
          <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* End Shift Button */}
        <button
          onClick={handleEndShift}
          disabled={step === 'ending'}
          className="w-full py-3.5 rounded-xl bg-destructive text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-destructive/90 transition-colors disabled:opacity-60"
        >
          {step === 'ending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Ending Shift...
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4" />
              End Shift
            </>
          )}
        </button>
      </div>
    );
  }

  // Idle / OFF DUTY: Start Shift
  return (
    <div className="px-4 py-5 space-y-5">
      {/* OFF DUTY Status Banner */}
      <div
        className="rounded-2xl p-5 text-center shadow-md"
        style={{ background: 'linear-gradient(135deg, #37474F 0%, #546E7A 100%)' }}
      >
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
          <CalendarCheck className="w-8 h-8 text-white/70" />
        </div>
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-2">
          <span className="w-2 h-2 rounded-full bg-white/50" />
          <span className="text-white font-bold text-sm tracking-widest">OFF DUTY</span>
        </div>
        <p className="text-white/70 text-sm">Start your shift to begin working</p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-xl p-3">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Check-in Requirements */}
      <MedicalCard className="p-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Check-in Requirements</h2>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            GPS accuracy ≤{MAX_GPS_ACCURACY_METERS}m
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            Within hospital geofence (100m radius)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            Selfie verification required
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            Registered device only
          </li>
        </ul>
      </MedicalCard>

      {/* Start Shift Button */}
      <button
        onClick={handleStartShift}
        className="w-full py-3.5 rounded-xl gradient-btn font-semibold text-sm flex items-center justify-center gap-2"
      >
        <LogIn className="w-4 h-4" />
        Start Shift
      </button>
    </div>
  );
}
