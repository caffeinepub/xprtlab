import { useEffect, useState } from "react";

interface LoadingScreenProps {
  message?: string;
  timeoutMs?: number;
}

export default function LoadingScreen({
  message = "Loading...",
  timeoutMs = 15000,
}: LoadingScreenProps) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.warn("[LoadingScreen] Loading timed out after", timeoutMs, "ms");
      setTimedOut(true);
    }, timeoutMs);
    return () => clearTimeout(timer);
  }, [timeoutMs]);

  if (timedOut) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-card rounded-2xl shadow-card p-8 text-center">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-warning"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            Taking too long
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            The app is taking longer than expected to load. Please check your
            connection and try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/assets/logo-1.png"
          alt="XpertLab"
          className="h-12 object-contain animate-pulse"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <p className="text-muted-foreground text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
