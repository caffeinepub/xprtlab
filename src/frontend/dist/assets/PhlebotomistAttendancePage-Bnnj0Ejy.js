import { r as reactExports, j as jsxRuntimeExports, R as React } from "./index-77iKE7z5.js";
import { u as useCamera } from "./useCamera-B7Rxq35n.js";
import { d as createLucideIcon, H as HealthcareBg, r as useGetTodaySummary, F as FlaskConical, L as LoaderCircle } from "./ProfileSetupModal-BB_monh5.js";
import { a as CalendarCheck, b as TrendingUp } from "./StaffApp-BNhKtWAK.js";
import { C as Clock } from "./clock-BEcvoIYA.js";
import { C as CircleCheckBig } from "./circle-check-big-DbLdUdcS.js";
import { D as DollarSign, C as CreditCard } from "./dollar-sign-bL89sulb.js";
import { N as Navigation } from "./navigation-DSXQqF3D.js";
import { M as MapPin } from "./map-pin-BZNwjx3t.js";
import { C as CircleAlert } from "./circle-alert-TSpHor6V.js";
import { R as RefreshCw } from "./refresh-cw-DhGnwtx0.js";
import { S as Shield } from "./user-EeFrjssy.js";
import { C as Camera } from "./camera-ojthlw-n.js";
import "./demoData-wn8GRowF.js";
import "./building-2-63YCEJlt.js";
import "./search-Bq-Fk22W.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode);
const MAX_GPS_ACCURACY_METERS = 150;
function validateGPSAccuracy(accuracyMeters) {
  return accuracyMeters <= MAX_GPS_ACCURACY_METERS;
}
function detectMockLocation(latitude, longitude, accuracy) {
  if (latitude === 0 && longitude === 0) return true;
  if (accuracy < 1) return true;
  if (Number.isInteger(latitude) && Number.isInteger(longitude)) return true;
  return false;
}
function GPSStep({ onSuccess }) {
  const [status, setStatus] = reactExports.useState("idle");
  const [location, setLocation] = reactExports.useState(null);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const requestLocation = reactExports.useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        if (!validateGPSAccuracy(accuracy)) {
          setStatus("error");
          setErrorMsg(
            `GPS accuracy is too low (${Math.round(accuracy)}m). Required: ≤${MAX_GPS_ACCURACY_METERS}m. Please move to an open area and try again.`
          );
          return;
        }
        const isMock = detectMockLocation(latitude, longitude, accuracy);
        const loc = {
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
          isMock
        };
        setLocation(loc);
        setStatus("success");
      },
      (error) => {
        setStatus("error");
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg(
              "Location permission denied. Please allow location access in your browser settings and try again."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg(
              "Location information is unavailable. Please check your GPS signal and try again."
            );
            break;
          case error.TIMEOUT:
            setErrorMsg(
              "Location request timed out. Please ensure GPS is enabled and try again."
            );
            break;
          default:
            setErrorMsg(
              "An unknown error occurred while retrieving your location. Please try again."
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15e3,
        maximumAge: 0
      }
    );
  }, []);
  reactExports.useEffect(() => {
    requestLocation();
  }, [requestLocation]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "step-card p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-5 h-5 text-blue-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-base", children: "GPS Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Verifying your current location" })
      ] })
    ] }),
    status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-7 h-7 text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-blue-500 animate-spin absolute -top-1 -right-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 text-center font-medium", children: "Acquiring GPS signal…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 text-center", children: "Please stay still and ensure GPS is enabled." })
    ] }),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-500 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: errorMsg })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: requestLocation,
          className: "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-blue-200 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retry Location"
          ]
        }
      )
    ] }),
    status === "success" && location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      location.isMock && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-amber-500 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-700", children: "Mock/spoofed location detected. This will be flagged in the attendance record." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-green-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-green-700", children: "Location Verified" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Latitude" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-gray-700", children: location.latitude.toFixed(5) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Longitude" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-gray-700", children: location.longitude.toFixed(5) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Accuracy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-gray-700", children: [
              "±",
              Math.round(location.accuracy),
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-700", children: new Date(location.timestamp).toLocaleTimeString() })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSuccess(location),
          className: "btn-gradient w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
            "Confirm Location"
          ]
        }
      )
    ] })
  ] });
}
function SelfieStep({ onSuccess }) {
  const [capturedPhoto, setCapturedPhoto] = reactExports.useState(null);
  const [captureError, setCaptureError] = reactExports.useState("");
  const [isCapturing, setIsCapturing] = reactExports.useState(false);
  const [videoReady, setVideoReady] = reactExports.useState(false);
  const videoReadyRef = reactExports.useRef(false);
  const {
    isActive,
    isSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    videoRef,
    canvasRef
  } = useCamera({
    facingMode: "user",
    width: 640,
    height: 480,
    quality: 0.85,
    format: "image/jpeg"
  });
  reactExports.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);
  reactExports.useEffect(() => {
    if (!isActive) {
      setVideoReady(false);
      videoReadyRef.current = false;
      return;
    }
    const checkReady = () => {
      const video2 = videoRef.current;
      if (video2 && video2.readyState >= 2 && video2.videoWidth > 0 && video2.videoHeight > 0) {
        if (!videoReadyRef.current) {
          videoReadyRef.current = true;
          setVideoReady(true);
        }
      }
    };
    checkReady();
    const video = videoRef.current;
    if (video) {
      video.addEventListener("canplay", checkReady);
      video.addEventListener("loadeddata", checkReady);
    }
    const interval = setInterval(checkReady, 200);
    return () => {
      clearInterval(interval);
      if (video) {
        video.removeEventListener("canplay", checkReady);
        video.removeEventListener("loadeddata", checkReady);
      }
    };
  }, [isActive, videoRef]);
  const handleCapture = reactExports.useCallback(async () => {
    setCaptureError("");
    const video = videoRef.current;
    if (!video) {
      setCaptureError("Camera not available. Please try again.");
      return;
    }
    if (!videoReady || video.videoWidth === 0 || video.videoHeight === 0) {
      setCaptureError(
        "Camera is still initializing. Please wait a moment and try again."
      );
      return;
    }
    setIsCapturing(true);
    try {
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setCaptureError("Failed to initialize canvas. Please try again.");
        setIsCapturing(false);
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      if (!dataUrl || dataUrl === "data:,") {
        setCaptureError(
          "Failed to capture photo. Please ensure camera is active and try again."
        );
        setIsCapturing(false);
        return;
      }
      setCapturedPhoto(dataUrl);
    } catch {
      setCaptureError("An error occurred while capturing. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  }, [videoRef, canvasRef, videoReady]);
  const handleRetake = reactExports.useCallback(() => {
    setCapturedPhoto(null);
    setCaptureError("");
    setVideoReady(false);
    videoReadyRef.current = false;
    startCamera();
  }, [startCamera]);
  const handleConfirm = reactExports.useCallback(() => {
    if (capturedPhoto) {
      stopCamera();
      onSuccess(capturedPhoto);
    }
  }, [capturedPhoto, stopCamera, onSuccess]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "step-card p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-purple-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5 text-purple-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-base", children: "Selfie Verification" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Take a selfie to verify your identity" })
      ] })
    ] }),
    isSupported === false && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-500 mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: "Camera is not supported on this device or browser." })
    ] }),
    cameraError && !capturedPhoto && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-500 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: cameraError.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setVideoReady(false);
            videoReadyRef.current = false;
            startCamera();
          },
          className: "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-purple-200 text-purple-600 text-sm font-semibold hover:bg-purple-50 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retry Camera"
          ]
        }
      )
    ] }),
    captureError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-amber-500 mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-700", children: captureError })
    ] }),
    !capturedPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full overflow-hidden rounded-3xl bg-gray-900",
          style: { aspectRatio: "4/3" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                autoPlay: true,
                playsInline: true,
                muted: true,
                className: "w-full h-full object-cover",
                style: { transform: "scaleX(-1)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
            (cameraLoading || !videoReady && isActive) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 text-white animate-spin mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-medium", children: cameraLoading ? "Starting camera…" : "Initializing video…" })
            ] }),
            videoReady && !cameraLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
              "Live"
            ] }),
            videoReady && !cameraLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-48 rounded-full border-2 border-white/40 border-dashed" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleCapture,
          disabled: !videoReady || isCapturing || cameraLoading,
          className: "btn-gradient w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
          children: isCapturing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
            "Capturing…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5" }),
            videoReady ? "Take Selfie" : "Waiting for camera…"
          ] })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full overflow-hidden rounded-3xl bg-gray-100",
          style: { aspectRatio: "4/3" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: capturedPhoto,
                alt: "Captured selfie",
                className: "w-full h-full object-cover",
                style: { transform: "scaleX(-1)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
              "Captured"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleRetake,
            className: "flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Retake"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleConfirm,
            className: "flex-1 btn-gradient py-3 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
              "Use Photo"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function ConfirmStep({
  location,
  selfieUrl,
  onConfirm,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "step-card p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-base", children: "Confirm Shift Start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Review your details before starting" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-medical-label text-gray-400", children: "Selfie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-full overflow-hidden rounded-2xl bg-gray-100",
          style: { aspectRatio: "4/3" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: selfieUrl,
              alt: "Shift selfie",
              className: "w-full h-full object-cover",
              style: { transform: "scaleX(-1)" }
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-medical-label text-gray-400", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Latitude" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-gray-700", children: location.latitude.toFixed(5) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Longitude" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-gray-700", children: location.longitude.toFixed(5) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Accuracy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-gray-700", children: [
              "±",
              Math.round(location.accuracy),
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 rounded-xl p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 block mb-0.5", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-700", children: new Date(location.timestamp).toLocaleTimeString() })
          ] })
        ] }),
        location.isMock && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-xl p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 shrink-0" }),
          "Mock location detected — will be flagged"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onConfirm,
        disabled: isLoading,
        className: "btn-gradient w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
          "Starting Shift…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
          "Start Shift"
        ] })
      }
    )
  ] });
}
function ActiveShiftPanel({
  shift,
  onEndShift,
  isEnding
}) {
  const [elapsed, setElapsed] = reactExports.useState("");
  const [endingShift, setEndingShift] = reactExports.useState(false);
  const [gpsStatus, setGpsStatus] = reactExports.useState(
    "idle"
  );
  reactExports.useEffect(() => {
    const update = () => {
      const diff = Date.now() - shift.startTime;
      const h = Math.floor(diff / 36e5);
      const m = Math.floor(diff % 36e5 / 6e4);
      const s = Math.floor(diff % 6e4 / 1e3);
      setElapsed(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    };
    update();
    const t = setInterval(update, 1e3);
    return () => clearInterval(t);
  }, [shift.startTime]);
  const handleEndShift = () => {
    setEndingShift(true);
    setGpsStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsStatus("done");
        const loc = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp
        };
        onEndShift(loc);
      },
      () => {
        setGpsStatus("done");
        onEndShift(shift.startLocation);
      },
      { enableHighAccuracy: true, timeout: 1e4, maximumAge: 0 }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "step-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900", children: "Shift Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
            "Started at ",
            new Date(shift.startTime).toLocaleTimeString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-green-600", children: "Live" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center mb-4 border border-blue-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1 font-medium", children: "Elapsed Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-gray-900 font-mono tracking-tight", children: elapsed })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-2xl mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: shift.selfieUrl,
          alt: "Check-in selfie",
          className: "w-full h-full object-cover",
          style: { transform: "scaleX(-1)" }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-700", children: "Check-in Selfie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Verified at shift start" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-500 ml-auto shrink-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleEndShift,
        disabled: isEnding || endingShift,
        className: "w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        children: isEnding || endingShift ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
          gpsStatus === "loading" ? "Getting location…" : "Ending Shift…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-5 h-5" }),
          "End Shift"
        ] })
      }
    )
  ] }) });
}
function CompletedShiftPanel({ shift }) {
  const totalMinutes = shift.totalMinutes ?? 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "step-card p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900", children: "Shift Completed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "All records locked for today" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1 font-medium", children: "Total Working Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-gray-900", children: [
        hours,
        "h ",
        minutes,
        "m"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Check-in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: new Date(shift.startTime).toLocaleTimeString() })
      ] }),
      shift.endTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Check-out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: new Date(shift.endTime).toLocaleTimeString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-green-600 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
          "Completed"
        ] })
      ] })
    ] })
  ] });
}
function TodaySummaryCards() {
  const { data: summary, isLoading } = useGetTodaySummary();
  const totalSamples = summary ? Number(summary.totalSamplesCollected) : 0;
  const cashCollected = summary ? Number(summary.cashCollected) : 0;
  const upiCollected = summary ? Number(summary.upiCollected) : 0;
  const pendingAmount = summary ? Number(summary.pendingAmount) : 0;
  const cards = [
    {
      label: "Samples",
      value: totalSamples.toString(),
      icon: FlaskConical,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Cash",
      value: `₹${cashCollected.toFixed(0)}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "UPI",
      value: `₹${upiCollected.toFixed(0)}`,
      icon: Smartphone,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      label: "Pending",
      value: `₹${pendingAmount.toFixed(0)}`,
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "step-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-gray-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700 text-sm", children: "Today's Summary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: cards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${card.bg} rounded-2xl p-3.5`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: `w-4 h-4 ${card.color}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 font-medium", children: card.label })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-16 bg-white/60 rounded-lg animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-bold ${card.color}`, children: card.value })
    ] }, card.label)) })
  ] });
}
function StepIndicator({ currentStep }) {
  const steps = [
    { key: "gps", label: "Location" },
    { key: "selfie", label: "Selfie" },
    { key: "confirm", label: "Confirm" }
  ];
  const stepIndex = steps.findIndex((s) => s.key === currentStep);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0 mb-2", children: steps.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center text-xs font-bold transition-all duration-300",
          style: {
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            ...idx < stepIndex ? {
              background: "#22C55E",
              color: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(34,197,94,0.3)"
            } : idx === stepIndex ? {
              background: "linear-gradient(135deg, #0D47A1, #26A69A)",
              color: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(13,71,161,0.3)"
            } : {
              background: "#F3F4F6",
              color: "#9CA3AF"
            }
          },
          children: idx < stepIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : idx + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-semibold transition-all duration-300",
          style: {
            color: idx === stepIndex ? "#0D47A1" : idx < stepIndex ? "#22C55E" : "#9CA3AF"
          },
          children: step.label
        }
      )
    ] }),
    idx < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mb-6 mx-2 rounded-full transition-all duration-300",
        style: {
          width: "40px",
          height: "2px",
          background: idx < stepIndex ? "linear-gradient(90deg, #22C55E, #16A34A)" : "#E5E7EB"
        }
      }
    )
  ] }, step.key)) });
}
function PhlebotomistAttendancePage({
  onNavigate: _onNavigate
}) {
  const [startStep, setStartStep] = reactExports.useState("gps");
  const [gpsLocation, setGpsLocation] = reactExports.useState(null);
  const [selfieUrl, setSelfieUrl] = reactExports.useState("");
  const [activeShift, setActiveShift] = reactExports.useState(null);
  const [completedShift, setCompletedShift] = reactExports.useState(
    null
  );
  const [isStarting, setIsStarting] = reactExports.useState(false);
  const [isEnding, setIsEnding] = reactExports.useState(false);
  const handleGPSSuccess = (location) => {
    setGpsLocation(location);
    setStartStep("selfie");
  };
  const handleSelfieSuccess = (photoDataUrl) => {
    setSelfieUrl(photoDataUrl);
    setStartStep("confirm");
  };
  const handleConfirmStart = () => {
    if (!gpsLocation || !selfieUrl) return;
    setIsStarting(true);
    setTimeout(() => {
      const shift = {
        id: `shift-${Date.now()}`,
        startTime: Date.now(),
        startLocation: gpsLocation,
        selfieUrl,
        status: "active"
      };
      setActiveShift(shift);
      setIsStarting(false);
    }, 800);
  };
  const handleEndShift = (endLocation) => {
    if (!activeShift) return;
    setIsEnding(true);
    setTimeout(() => {
      const endTime = Date.now();
      const totalMinutes = Math.round(
        (endTime - activeShift.startTime) / 6e4
      );
      const completed = {
        ...activeShift,
        endTime,
        endLocation,
        status: "completed",
        totalMinutes
      };
      setCompletedShift(completed);
      setActiveShift(null);
      setIsEnding(false);
    }, 800);
  };
  if (completedShift) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative min-h-screen pb-[90px] page-fade-in",
        style: { background: "#F7F9FC" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "minimal", opacity: 0.035 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-header px-4 pt-6 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Attendance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long"
                }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-4 space-y-4 max-w-lg mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CompletedShiftPanel, { shift: completedShift }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TodaySummaryCards, {})
            ] })
          ] })
        ]
      }
    );
  }
  if (activeShift) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative min-h-screen pb-[90px] page-fade-in",
        style: { background: "#F7F9FC" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "minimal", opacity: 0.035 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-header px-4 pt-6 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Attendance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long"
                }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-4 space-y-4 max-w-lg mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActiveShiftPanel,
                {
                  shift: activeShift,
                  onEndShift: handleEndShift,
                  isEnding
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TodaySummaryCards, {})
            ] })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen pb-[90px] page-fade-in",
      style: { background: "#F7F9FC" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "minimal", opacity: 0.035 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-header px-4 pt-6 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Start Attendance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long"
              }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-4 space-y-4 max-w-lg mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "step-card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { currentStep: startStep }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-step-slide-in", children: [
              startStep === "gps" && /* @__PURE__ */ jsxRuntimeExports.jsx(GPSStep, { onSuccess: handleGPSSuccess }),
              startStep === "selfie" && /* @__PURE__ */ jsxRuntimeExports.jsx(SelfieStep, { onSuccess: handleSelfieSuccess }),
              startStep === "confirm" && gpsLocation && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConfirmStep,
                {
                  location: gpsLocation,
                  selfieUrl,
                  onConfirm: handleConfirmStart,
                  isLoading: isStarting
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TodaySummaryCards, {})
          ] })
        ] })
      ]
    }
  );
}
export {
  PhlebotomistAttendancePage as default
};
