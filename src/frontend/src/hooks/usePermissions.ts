import { useCallback, useState } from "react";

// ─── Camera Permission ──────────────────────────────────────────────────────

export function useCameraPermission() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);

  const request = useCallback(async (): Promise<MediaStream> => {
    setRequesting(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      return mediaStream;
    } catch (err: any) {
      let msg =
        "Camera permission denied. Please allow camera access in your browser settings.";
      if (
        err?.name === "NotAllowedError" ||
        err?.name === "PermissionDeniedError"
      ) {
        msg =
          "Camera permission denied. Please allow camera access in your browser settings.";
      } else if (
        err?.name === "NotFoundError" ||
        err?.name === "DevicesNotFoundError"
      ) {
        msg = "No camera found on this device.";
      } else if (err?.name === "NotReadableError") {
        msg = "Camera is already in use by another application.";
      }
      setError(msg);
      throw new Error(msg);
    } finally {
      setRequesting(false);
    }
  }, []);

  return { stream, error, requesting, request };
}

// ─── Location Permission ─────────────────────────────────────────────────────

export function useLocationPermission() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);

  const request = useCallback((): Promise<GeolocationCoordinates> => {
    setRequesting(true);
    setError(null);
    return new Promise<GeolocationCoordinates>((resolve, reject) => {
      if (!navigator.geolocation) {
        const msg = "Geolocation is not supported by this browser.";
        setError(msg);
        setRequesting(false);
        reject(new Error(msg));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords(pos.coords);
          setRequesting(false);
          resolve(pos.coords);
        },
        (err) => {
          let msg = "Location request failed. Please try again.";
          if (err.code === err.PERMISSION_DENIED) {
            msg = "Location permission denied. Please enable location access.";
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            msg = "Location unavailable. Please check your GPS settings.";
          } else if (err.code === err.TIMEOUT) {
            msg = "Location request timed out. Please try again.";
          }
          setError(msg);
          setRequesting(false);
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    });
  }, []);

  return { coords, error, requesting, request };
}
