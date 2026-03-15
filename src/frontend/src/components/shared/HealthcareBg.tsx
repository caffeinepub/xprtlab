import React from "react";

interface HealthcareBgProps {
  variant?: "default" | "minimal" | "ecg";
  opacity?: number;
}

/**
 * Subtle healthcare-themed SVG background decoration.
 * Use inside a `relative` positioned container.
 * All content above this must use `relative z-10`.
 */
export default function HealthcareBg({
  variant = "default",
  opacity = 0.035,
}: HealthcareBgProps) {
  if (variant === "ecg") {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity, zIndex: 0 }}
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          role="presentation"
        >
          <defs>
            <pattern
              id="ecg-bg"
              x="0"
              y="0"
              width="200"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <polyline
                points="0,40 20,40 30,15 40,65 50,40 70,40 80,20 90,60 100,40 120,40 130,10 140,70 150,40 170,40 180,25 190,55 200,40"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ecg-bg)" />
        </svg>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity, zIndex: 0 }}
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          role="presentation"
        >
          <defs>
            <pattern
              id="minimal-bg"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="2" fill="#06B6D4" />
              <circle cx="0" cy="0" r="1.5" fill="#2563EB" />
              <circle cx="60" cy="60" r="1.5" fill="#2563EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#minimal-bg)" />
        </svg>
      </div>
    );
  }

  // default — medical cross + circles + DNA-like dots
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity, zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <pattern
            id="medical-bg"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Medical cross */}
            <path
              d="M44 30 L44 40 L34 40 L34 48 L44 48 L44 58 L52 58 L52 48 L62 48 L62 40 L52 40 L52 30 Z"
              fill="#2563EB"
            />
            {/* Accent circles */}
            <circle cx="10" cy="10" r="4" fill="#06B6D4" opacity="0.6" />
            <circle cx="90" cy="90" r="4" fill="#06B6D4" opacity="0.6" />
            <circle cx="10" cy="90" r="2.5" fill="#2563EB" opacity="0.4" />
            <circle cx="90" cy="10" r="2.5" fill="#2563EB" opacity="0.4" />
            {/* DNA-like dots */}
            <circle cx="25" cy="70" r="2" fill="#06B6D4" opacity="0.5" />
            <circle cx="35" cy="80" r="2" fill="#2563EB" opacity="0.5" />
            <circle cx="75" cy="20" r="2" fill="#06B6D4" opacity="0.5" />
            <circle cx="85" cy="30" r="2" fill="#2563EB" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#medical-bg)" />
      </svg>
    </div>
  );
}
