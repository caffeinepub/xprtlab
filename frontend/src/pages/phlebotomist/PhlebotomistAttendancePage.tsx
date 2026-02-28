import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin, Camera, CheckCircle, Clock, Play, Square,
  AlertCircle, RefreshCw, Loader2, Shield, Navigation,
  CalendarCheck, FlaskConical, DollarSign, Smartphone,
  CreditCard, TrendingUp
} from 'lucide-react';
import { useCamera } from '../../camera/useCamera';
import { validateGPSAccuracy, detectMockLocation, MAX_GPS_ACCURACY_METERS } from '../../utils/geoHelpers';
import { useGetTodaySummary } from '../../hooks/useQueries';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GPSLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  isMock?: boolean;
}

interface ShiftRecord {
  id: string;
  startTime: number;
  endTime?: number;
  startLocation: GPSLocation;
  endLocation?: GPSLocation;
  selfieUrl: string;
  status: 'active' | 'completed';
  totalMinutes?: number;
}

type StartStep = 'gps' | 'selfie' | 'confirm';

// ─── GPS Step ─────────────────────────────────────────────────────────────────

interface GPSStepProps {
  onSuccess: (location: GPSLocation) => void;
}

function GPSStep({ onSuccess }: GPSStepProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [location, setLocation] = useState<GPSLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        if (!validateGPSAccuracy(accuracy)) {
          setStatus('error');
          setErrorMsg(
            `GPS accuracy is too low (${Math.round(accuracy)}m). ` +
            `Required: ≤${MAX_GPS_ACCURACY_METERS}m. Please move to an open area and try again.`
          );
          return;
        }

        const isMock = detectMockLocation(latitude, longitude, accuracy);

        const loc: GPSLocation = {
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
          isMock,
        };

        setLocation(loc);
        setStatus('success');
      },
      (error) => {
        setStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg('Location permission denied. Please allow location access in your browser settings and try again.');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg('Location information is unavailable. Please check your GPS signal and try again.');
            break;
          case error.TIMEOUT:
            setErrorMsg('Location request timed out. Please ensure GPS is enabled and try again.');
            break;
          default:
            setErrorMsg('An unknown error occurred while retrieving your location. Please try again.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return (
    <div className="step-card p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Navigation className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base">GPS Location</h3>
          <p className="text-xs text-gray-500">Verifying your current location</p>
        </div>
      </div>

      {status === 'loading' && (
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <MapPin className="w-7 h-7 text-blue-400" />
            </div>
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin absolute -top-1 -right-1" />
          </div>
          <p className="text-sm text-gray-600 text-center font-medium">Acquiring GPS signal…</p>
          <p className="text-xs text-gray-400 text-center">Please stay still and ensure GPS is enabled.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{errorMsg}</p>
          </div>
          <button
            onClick={requestLocation}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-blue-200 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Location
          </button>
        </div>
      )}

      {status === 'success' && location && (
        <div className="space-y-3">
          {location.isMock && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <Shield className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-700">Mock/spoofed location detected. This will be flagged in the attendance record.</p>
            </div>
          )}

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-green-700">Location Verified</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/70 rounded-xl p-2.5">
                <span className="text-gray-400 block mb-0.5">Latitude</span>
                <span className="font-mono font-semibold text-gray-700">{location.latitude.toFixed(5)}</span>
              </div>
              <div className="bg-white/70 rounded-xl p-2.5">
                <span className="text-gray-400 block mb-0.5">Longitude</span>
                <span className="font-mono font-semibold text-gray-700">{location.longitude.toFixed(5)}</span>
              </div>
              <div className="bg-white/70 rounded-xl p-2.5">
                <span className="text-gray-400 block mb-0.5">Accuracy</span>
                <span className="font-semibold text-gray-700">±{Math.round(location.accuracy)}m</span>
              </div>
              <div className="bg-white/70 rounded-xl p-2.5">
                <span className="text-gray-400 block mb-0.5">Time</span>
                <span className="font-semibold text-gray-700">{new Date(location.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSuccess(location)}
            className="btn-gradient w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Confirm Location
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Selfie Step ──────────────────────────────────────────────────────────────

interface SelfieStepProps {
  onSuccess: (photoDataUrl: string) => void;
}

function SelfieStep({ onSuccess }: SelfieStepProps) {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [captureError, setCaptureError] = useState<string>('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoReadyRef = useRef(false);

  const {
    isActive,
    isSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: 'user',
    width: 640,
    height: 480,
    quality: 0.85,
    format: 'image/jpeg',
  });

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isActive) {
      setVideoReady(false);
      videoReadyRef.current = false;
      return;
    }

    const checkReady = () => {
      const video = videoRef.current;
      if (
        video &&
        video.readyState >= 2 &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        if (!videoReadyRef.current) {
          videoReadyRef.current = true;
          setVideoReady(true);
        }
      }
    };

    checkReady();

    const video = videoRef.current;
    if (video) {
      video.addEventListener('canplay', checkReady);
      video.addEventListener('loadeddata', checkReady);
    }

    const interval = setInterval(checkReady, 200);

    return () => {
      clearInterval(interval);
      if (video) {
        video.removeEventListener('canplay', checkReady);
        video.removeEventListener('loadeddata', checkReady);
      }
    };
  }, [isActive, videoRef]);

  const handleCapture = useCallback(async () => {
    setCaptureError('');
    const video = videoRef.current;

    if (!video) {
      setCaptureError('Camera not available. Please try again.');
      return;
    }

    if (!videoReady || video.videoWidth === 0 || video.videoHeight === 0) {
      setCaptureError('Camera is still initializing. Please wait a moment and try again.');
      return;
    }

    setIsCapturing(true);

    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setCaptureError('Failed to initialize canvas. Please try again.');
        setIsCapturing(false);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      if (!dataUrl || dataUrl === 'data:,') {
        setCaptureError('Failed to capture photo. Please ensure camera is active and try again.');
        setIsCapturing(false);
        return;
      }

      setCapturedPhoto(dataUrl);
    } catch {
      setCaptureError('An error occurred while capturing. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  }, [videoRef, canvasRef, videoReady]);

  const handleRetake = useCallback(() => {
    setCapturedPhoto(null);
    setCaptureError('');
    setVideoReady(false);
    videoReadyRef.current = false;
    startCamera();
  }, [startCamera]);

  const handleConfirm = useCallback(() => {
    if (capturedPhoto) {
      stopCamera();
      onSuccess(capturedPhoto);
    }
  }, [capturedPhoto, stopCamera, onSuccess]);

  return (
    <div className="step-card p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-purple-50 flex items-center justify-center">
          <Camera className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base">Selfie Verification</h3>
          <p className="text-xs text-gray-500">Take a selfie to verify your identity</p>
        </div>
      </div>

      {isSupported === false && (
        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">Camera is not supported on this device or browser.</p>
        </div>
      )}

      {cameraError && !capturedPhoto && (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{cameraError.message}</p>
          </div>
          <button
            onClick={() => { setVideoReady(false); videoReadyRef.current = false; startCamera(); }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-purple-200 text-purple-600 text-sm font-semibold hover:bg-purple-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Camera
          </button>
        </div>
      )}

      {captureError && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700">{captureError}</p>
        </div>
      )}

      {!capturedPhoto ? (
        <div className="space-y-4">
          <div
            className="relative w-full overflow-hidden rounded-3xl bg-gray-900"
            style={{ aspectRatio: '4/3' }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
            <canvas ref={canvasRef} className="hidden" />

            {(cameraLoading || (!videoReady && isActive)) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80">
                <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
                <p className="text-white text-sm font-medium">
                  {cameraLoading ? 'Starting camera…' : 'Initializing video…'}
                </p>
              </div>
            )}

            {videoReady && !cameraLoading && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live
              </div>
            )}

            {/* Selfie guide overlay */}
            {videoReady && !cameraLoading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-48 rounded-full border-2 border-white/40 border-dashed" />
              </div>
            )}
          </div>

          <button
            onClick={handleCapture}
            disabled={!videoReady || isCapturing || cameraLoading}
            className="btn-gradient w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCapturing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Capturing…
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                {videoReady ? 'Take Selfie' : 'Waiting for camera…'}
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className="relative w-full overflow-hidden rounded-3xl bg-gray-100"
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src={capturedPhoto}
              alt="Captured selfie"
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Captured
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRetake}
              className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 btn-gradient py-3 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Use Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Confirm Step ─────────────────────────────────────────────────────────────

interface ConfirmStepProps {
  location: GPSLocation;
  selfieUrl: string;
  onConfirm: () => void;
  isLoading: boolean;
}

function ConfirmStep({ location, selfieUrl, onConfirm, isLoading }: ConfirmStepProps) {
  return (
    <div className="step-card p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base">Confirm Shift Start</h3>
          <p className="text-xs text-gray-500">Review your details before starting</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-medical-label text-gray-400">Selfie</p>
        <div
          className="w-full overflow-hidden rounded-2xl bg-gray-100"
          style={{ aspectRatio: '4/3' }}
        >
          <img
            src={selfieUrl}
            alt="Shift selfie"
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-medical-label text-gray-400">Location</p>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/70 rounded-xl p-2.5">
              <span className="text-gray-400 block mb-0.5">Latitude</span>
              <span className="font-mono font-semibold text-gray-700">{location.latitude.toFixed(5)}</span>
            </div>
            <div className="bg-white/70 rounded-xl p-2.5">
              <span className="text-gray-400 block mb-0.5">Longitude</span>
              <span className="font-mono font-semibold text-gray-700">{location.longitude.toFixed(5)}</span>
            </div>
            <div className="bg-white/70 rounded-xl p-2.5">
              <span className="text-gray-400 block mb-0.5">Accuracy</span>
              <span className="font-semibold text-gray-700">±{Math.round(location.accuracy)}m</span>
            </div>
            <div className="bg-white/70 rounded-xl p-2.5">
              <span className="text-gray-400 block mb-0.5">Time</span>
              <span className="font-semibold text-gray-700">{new Date(location.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
          {location.isMock && (
            <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-xl p-2">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              Mock location detected — will be flagged
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={isLoading}
        className="btn-gradient w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Starting Shift…
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Start Shift
          </>
        )}
      </button>
    </div>
  );
}

// ─── Active Shift Panel ───────────────────────────────────────────────────────

interface ActiveShiftPanelProps {
  shift: ShiftRecord;
  onEndShift: (location: GPSLocation) => void;
  isEnding: boolean;
}

function ActiveShiftPanel({ shift, onEndShift, isEnding }: ActiveShiftPanelProps) {
  const [elapsed, setElapsed] = useState('');
  const [endingShift, setEndingShift] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - shift.startTime;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setElapsed(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [shift.startTime]);

  const handleEndShift = () => {
    setEndingShift(true);
    setGpsStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsStatus('done');
        const loc: GPSLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        };
        onEndShift(loc);
      },
      () => {
        // Use start location as fallback
        setGpsStatus('done');
        onEndShift(shift.startLocation);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="space-y-4">
      {/* Active shift card */}
      <div className="step-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Shift Active</h3>
              <p className="text-xs text-gray-500">Started at {new Date(shift.startTime).toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-600">Live</span>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center mb-4 border border-blue-100">
          <p className="text-xs text-gray-500 mb-1 font-medium">Elapsed Time</p>
          <p className="text-4xl font-bold text-gray-900 font-mono tracking-tight">{elapsed}</p>
        </div>

        {/* Selfie thumbnail */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <img
              src={shift.selfieUrl}
              alt="Check-in selfie"
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">Check-in Selfie</p>
            <p className="text-xs text-gray-400">Verified at shift start</p>
          </div>
          <CheckCircle className="w-4 h-4 text-green-500 ml-auto shrink-0" />
        </div>

        {/* End shift button */}
        <button
          onClick={handleEndShift}
          disabled={isEnding || endingShift}
          className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {(isEnding || endingShift) ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {gpsStatus === 'loading' ? 'Getting location…' : 'Ending Shift…'}
            </>
          ) : (
            <>
              <Square className="w-5 h-5" />
              End Shift
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Completed Shift Panel ────────────────────────────────────────────────────

interface CompletedShiftPanelProps {
  shift: ShiftRecord;
}

function CompletedShiftPanel({ shift }: CompletedShiftPanelProps) {
  const totalMinutes = shift.totalMinutes ?? 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="step-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center">
          <CalendarCheck className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Shift Completed</h3>
          <p className="text-xs text-gray-500">All records locked for today</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100 text-center">
        <p className="text-xs text-gray-500 mb-1 font-medium">Total Working Time</p>
        <p className="text-3xl font-bold text-gray-900">{hours}h {minutes}m</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-500">Check-in</span>
          <span className="font-semibold text-gray-800">{new Date(shift.startTime).toLocaleTimeString()}</span>
        </div>
        {shift.endTime && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-500">Check-out</span>
            <span className="font-semibold text-gray-800">{new Date(shift.endTime).toLocaleTimeString()}</span>
          </div>
        )}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-500">Status</span>
          <span className="font-semibold text-green-600 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Summary Cards ────────────────────────────────────────────────────────────

function TodaySummaryCards() {
  const { data: summary, isLoading } = useGetTodaySummary();

  const totalSamples = summary ? Number(summary.totalSamplesCollected) : 0;
  const cashCollected = summary ? Number(summary.cashCollected) : 0;
  const upiCollected = summary ? Number(summary.upiCollected) : 0;
  const pendingAmount = summary ? Number(summary.pendingAmount) : 0;

  const cards = [
    { label: 'Samples', value: totalSamples.toString(), icon: FlaskConical, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Cash', value: `₹${cashCollected.toFixed(0)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'UPI', value: `₹${upiCollected.toFixed(0)}`, icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending', value: `₹${pendingAmount.toFixed(0)}`, icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="step-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-gray-500" />
        <h3 className="font-semibold text-gray-700 text-sm">Today's Summary</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => (
          <div key={card.label} className={`${card.bg} rounded-2xl p-3.5`}>
            <div className="flex items-center gap-2 mb-1.5">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <span className="text-xs text-gray-500 font-medium">{card.label}</span>
            </div>
            {isLoading ? (
              <div className="h-6 w-16 bg-white/60 rounded-lg animate-pulse" />
            ) : (
              <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

interface StepIndicatorProps {
  currentStep: StartStep;
}

function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps: { key: StartStep; label: string }[] = [
    { key: 'gps', label: 'Location' },
    { key: 'selfie', label: 'Selfie' },
    { key: 'confirm', label: 'Confirm' },
  ];

  const stepIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-0 mb-2">
      {steps.map((step, idx) => (
        <React.Fragment key={step.key}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                idx < stepIndex
                  ? 'bg-green-500 text-white'
                  : idx === stepIndex
                  ? 'bg-gradient-brand text-white shadow-btn-gradient'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {idx < stepIndex ? <CheckCircle className="w-4 h-4" /> : idx + 1}
            </div>
            <span className={`text-xs font-medium ${idx === stepIndex ? 'text-gray-800' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mb-5 mx-1 rounded-full transition-all ${
                idx < stepIndex ? 'bg-green-400' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface PhlebotomistAttendancePageProps {
  onNavigate?: (path: string) => void;
}

export default function PhlebotomistAttendancePage({ onNavigate: _onNavigate }: PhlebotomistAttendancePageProps) {
  const [startStep, setStartStep] = useState<StartStep>('gps');
  const [gpsLocation, setGpsLocation] = useState<GPSLocation | null>(null);
  const [selfieUrl, setSelfieUrl] = useState<string>('');
  const [activeShift, setActiveShift] = useState<ShiftRecord | null>(null);
  const [completedShift, setCompletedShift] = useState<ShiftRecord | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const handleGPSSuccess = (location: GPSLocation) => {
    setGpsLocation(location);
    setStartStep('selfie');
  };

  const handleSelfieSuccess = (photoDataUrl: string) => {
    setSelfieUrl(photoDataUrl);
    setStartStep('confirm');
  };

  const handleConfirmStart = () => {
    if (!gpsLocation || !selfieUrl) return;
    setIsStarting(true);

    // Simulate shift start (local state only — no backend shift tracking)
    setTimeout(() => {
      const shift: ShiftRecord = {
        id: `shift-${Date.now()}`,
        startTime: Date.now(),
        startLocation: gpsLocation,
        selfieUrl,
        status: 'active',
      };
      setActiveShift(shift);
      setIsStarting(false);
    }, 800);
  };

  const handleEndShift = (endLocation: GPSLocation) => {
    if (!activeShift) return;
    setIsEnding(true);

    setTimeout(() => {
      const endTime = Date.now();
      const totalMinutes = Math.round((endTime - activeShift.startTime) / 60000);
      const completed: ShiftRecord = {
        ...activeShift,
        endTime,
        endLocation,
        status: 'completed',
        totalMinutes,
      };
      setCompletedShift(completed);
      setActiveShift(null);
      setIsEnding(false);
    }, 800);
  };

  // ── Completed state ──
  if (completedShift) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 page-fade-in">
        {/* Gradient header */}
        <div className="gradient-header px-4 pt-6 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Attendance</h1>
              <p className="text-xs text-white/70">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        </div>

        <div className="px-4 -mt-4 space-y-4 max-w-lg mx-auto">
          <CompletedShiftPanel shift={completedShift} />
          <TodaySummaryCards />
        </div>
      </div>
    );
  }

  // ── Active shift ──
  if (activeShift) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 page-fade-in">
        {/* Gradient header */}
        <div className="gradient-header px-4 pt-6 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Attendance</h1>
              <p className="text-xs text-white/70">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        </div>

        <div className="px-4 -mt-4 space-y-4 max-w-lg mx-auto">
          <ActiveShiftPanel
            shift={activeShift}
            onEndShift={handleEndShift}
            isEnding={isEnding}
          />
          <TodaySummaryCards />
        </div>
      </div>
    );
  }

  // ── Start shift flow ──
  return (
    <div className="min-h-screen bg-gray-50 pb-24 page-fade-in">
      {/* Gradient header */}
      <div className="gradient-header px-4 pt-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <CalendarCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Start Attendance</h1>
            <p className="text-xs text-white/70">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 max-w-lg mx-auto">
        {/* Step indicator */}
        <div className="step-card p-4">
          <StepIndicator currentStep={startStep} />
        </div>

        {/* Step content */}
        <div className="animate-step-slide-in">
          {startStep === 'gps' && (
            <GPSStep onSuccess={handleGPSSuccess} />
          )}
          {startStep === 'selfie' && (
            <SelfieStep onSuccess={handleSelfieSuccess} />
          )}
          {startStep === 'confirm' && gpsLocation && (
            <ConfirmStep
              location={gpsLocation}
              selfieUrl={selfieUrl}
              onConfirm={handleConfirmStart}
              isLoading={isStarting}
            />
          )}
        </div>

        {/* Today's summary (always visible) */}
        <TodaySummaryCards />
      </div>
    </div>
  );
}
