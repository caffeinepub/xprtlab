import { r as reactExports, j as jsxRuntimeExports } from "./index-vGeq55gD.js";
import { G as GradientButton } from "./GradientButton-4fP7LxFy.js";
import { M as MedicalCard } from "./MedicalCard-CnWiIuj2.js";
import { u as useCamera } from "./useCamera-C702sVsR.js";
import { f as formatTime } from "./formatters-DgcbtmQq.js";
import { C as Camera } from "./camera-B0Ag-luK.js";
import { Q as QrCode } from "./qr-code-6N-720-O.js";
import { C as CircleAlert } from "./circle-alert-YkfRFmas.js";
import { d as createLucideIcon } from "./ProfileSetupModal-DOcw6VTl.js";
import { C as CircleCheckBig } from "./circle-check-big-CMOhcXOF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1", key: "1ssd4o" }]
];
const CircleStop = createLucideIcon("circle-stop", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
const useQRScanner = (config) => {
  const {
    scanInterval = 100,
    maxResults = 10,
    jsQRUrl = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js",
    ...cameraConfig
  } = config;
  const [qrResults, setQrResults] = reactExports.useState([]);
  const [isScanning, setIsScanning] = reactExports.useState(false);
  const [jsQRLoaded, setJsQRLoaded] = reactExports.useState(false);
  const scanIntervalRef = reactExports.useRef(null);
  const lastScanRef = reactExports.useRef("");
  const isMountedRef = reactExports.useRef(true);
  const camera = useCamera(cameraConfig);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.jsQR) {
      setJsQRLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = jsQRUrl;
    script.onload = () => {
      if (isMountedRef.current) {
        setJsQRLoaded(true);
      }
    };
    script.onerror = () => console.error("Failed to load jsQR library");
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [jsQRUrl]);
  reactExports.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);
  const scanQRCode = reactExports.useCallback(() => {
    if (!camera.videoRef.current || !camera.canvasRef.current || !jsQRLoaded || !window.jsQR) {
      return;
    }
    const video = camera.videoRef.current;
    const canvas = camera.canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = window.jsQR(imageData.data, imageData.width, imageData.height);
    if ((code == null ? void 0 : code.data) && code.data !== lastScanRef.current) {
      lastScanRef.current = code.data;
      const newResult = {
        data: code.data,
        timestamp: Date.now()
      };
      if (isMountedRef.current) {
        setQrResults((prev) => [newResult, ...prev.slice(0, maxResults - 1)]);
      }
    }
  }, [camera.videoRef, camera.canvasRef, jsQRLoaded, maxResults]);
  reactExports.useEffect(() => {
    if (isScanning && camera.isActive && jsQRLoaded) {
      scanIntervalRef.current = setInterval(scanQRCode, scanInterval);
    } else {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
    }
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isScanning, camera.isActive, jsQRLoaded, scanQRCode, scanInterval]);
  const startScanning = reactExports.useCallback(async () => {
    if (!camera.isActive) {
      const success = await camera.startCamera();
      if (success) {
        setIsScanning(true);
        return true;
      }
      return false;
    }
    setIsScanning(true);
    return true;
  }, [camera.isActive, camera.startCamera]);
  const stopScanning = reactExports.useCallback(async () => {
    setIsScanning(false);
    await camera.stopCamera();
    lastScanRef.current = "";
  }, [camera.stopCamera]);
  const switchCamera = reactExports.useCallback(async () => {
    const success = await camera.switchCamera();
    if (success && isScanning) {
      lastScanRef.current = "";
    }
    return success;
  }, [camera.switchCamera, isScanning]);
  const clearResults = reactExports.useCallback(() => {
    setQrResults([]);
    lastScanRef.current = "";
  }, []);
  const reset = reactExports.useCallback(() => {
    setIsScanning(false);
    clearResults();
  }, [clearResults]);
  return {
    // QR Scanner state
    qrResults,
    isScanning,
    jsQRLoaded,
    // Camera state (pass-through)
    isActive: camera.isActive,
    isSupported: camera.isSupported,
    error: camera.error,
    isLoading: camera.isLoading,
    currentFacingMode: camera.currentFacingMode,
    // Actions
    startScanning,
    stopScanning,
    switchCamera,
    clearResults,
    reset,
    retry: camera.retry,
    // Refs for components
    videoRef: camera.videoRef,
    canvasRef: camera.canvasRef,
    // Computed state
    isReady: jsQRLoaded && camera.isSupported !== false,
    canStartScanning: jsQRLoaded && camera.isSupported === true && !camera.isLoading
  };
};
function ScanCampQRPage() {
  const {
    qrResults,
    isScanning,
    isActive,
    isSupported,
    error,
    isLoading,
    canStartScanning,
    startScanning,
    stopScanning,
    clearResults,
    videoRef,
    canvasRef
  } = useQRScanner({
    facingMode: "environment",
    scanInterval: 200,
    maxResults: 10
  });
  reactExports.useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);
  if (isSupported === false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-12 h-12 mx-auto text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Camera Not Supported" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your browser does not support camera access." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-4 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Scan Camp QR" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Scan QR code to log camp check-in" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalCard, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full bg-black",
        style: { aspectRatio: "16/9", minHeight: 220 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: videoRef,
              className: "w-full h-full object-cover",
              playsInline: true,
              muted: true,
              style: { display: isActive ? "block" : "none" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
          !isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-white gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-12 h-12 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-60", children: "Camera preview will appear here" })
          ] }),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 h-48 border-2 border-white/70 rounded-2xl relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" })
          ] }) }),
          isScanning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 animate-pulse" }),
            "Scanning..."
          ] })
        ]
      }
    ) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalCard, { className: "border-destructive/30 bg-destructive/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: error.message })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: !isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GradientButton,
      {
        onClick: startScanning,
        disabled: !canStartScanning || isLoading,
        loading: isLoading,
        className: "flex-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
          "Start Scanning"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: stopScanning,
        disabled: isLoading,
        className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-destructive text-destructive font-semibold text-sm hover:bg-destructive/5 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleStop, { className: "w-4 h-4" }),
          "Stop Scanning"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground", children: [
          "Scan Results (",
          qrResults.length,
          ")"
        ] }),
        qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: clearResults,
            className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
              "Clear"
            ]
          }
        )
      ] }),
      qrResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-10 h-10 mx-auto text-muted-foreground/30 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No QR codes scanned yet" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: qrResults.map((result) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MedicalCard,
        {
          className: "border-green-200 bg-green-50",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground break-all", children: result.data }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Scanned at ",
                formatTime(result.timestamp)
              ] })
            ] })
          ] })
        },
        result.timestamp
      )) })
    ] })
  ] });
}
export {
  ScanCampQRPage as default
};
