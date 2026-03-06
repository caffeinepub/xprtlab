import {
  AlertCircle,
  Camera,
  CheckCircle,
  QrCode,
  RotateCcw,
  StopCircle,
} from "lucide-react";
import React, { useEffect } from "react";
import GradientButton from "../../components/shared/GradientButton";
import MedicalCard from "../../components/shared/MedicalCard";
import { useQRScanner } from "../../qr-code/useQRScanner";
import { formatTime } from "../../utils/formatters";

export default function ScanCampQRPage() {
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
    canvasRef,
  } = useQRScanner({
    facingMode: "environment",
    scanInterval: 200,
    maxResults: 10,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional cleanup on unmount only
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  if (isSupported === false) {
    return (
      <div className="px-4 py-5">
        <MedicalCard className="text-center py-12">
          <Camera className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="font-semibold text-foreground">Camera Not Supported</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your browser does not support camera access.
          </p>
        </MedicalCard>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Scan Camp QR</h1>
        <p className="text-sm text-muted-foreground">
          Scan QR code to log camp check-in
        </p>
      </div>

      {/* Camera Preview */}
      <MedicalCard className="p-0 overflow-hidden">
        <div
          className="relative w-full bg-black"
          style={{ aspectRatio: "16/9", minHeight: 220 }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            style={{ display: isActive ? "block" : "none" }}
          />
          <canvas ref={canvasRef} className="hidden" />

          {!isActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3">
              <QrCode className="w-12 h-12 opacity-40" />
              <p className="text-sm opacity-60">
                Camera preview will appear here
              </p>
            </div>
          )}

          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-white/70 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" />
              </div>
            </div>
          )}

          {isScanning && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Scanning...
            </div>
          )}
        </div>
      </MedicalCard>

      {/* Error */}
      {error && (
        <MedicalCard className="border-destructive/30 bg-destructive/5">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm font-medium">{error.message}</p>
          </div>
        </MedicalCard>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!isActive ? (
          <GradientButton
            onClick={startScanning}
            disabled={!canStartScanning || isLoading}
            loading={isLoading}
            className="flex-1"
          >
            <Camera className="w-4 h-4" />
            Start Scanning
          </GradientButton>
        ) : (
          <button
            type="button"
            onClick={stopScanning}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-destructive text-destructive font-semibold text-sm hover:bg-destructive/5 transition-colors"
          >
            <StopCircle className="w-4 h-4" />
            Stop Scanning
          </button>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground">
            Scan Results ({qrResults.length})
          </h2>
          {qrResults.length > 0 && (
            <button
              type="button"
              onClick={clearResults}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        {qrResults.length === 0 ? (
          <MedicalCard className="text-center py-8">
            <QrCode className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">
              No QR codes scanned yet
            </p>
          </MedicalCard>
        ) : (
          <div className="space-y-2">
            {qrResults.map((result) => (
              <MedicalCard
                key={result.timestamp}
                className="border-green-200 bg-green-50"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground break-all">
                      {result.data}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Scanned at {formatTime(result.timestamp)}
                    </p>
                  </div>
                </div>
              </MedicalCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
