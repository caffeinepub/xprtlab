import { cn } from "@/lib/utils";
import type React from "react";

interface MedicalCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
  "data-ocid"?: string;
}

export default function MedicalCard({
  children,
  className,
  style,
  onClick,
  hoverable,
  "data-ocid": dataOcid,
}: MedicalCardProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick()
          : undefined
      }
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      data-ocid={dataOcid}
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        padding: "18px",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        ...style,
      }}
      className={cn(
        hoverable &&
          "cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5",
        className,
      )}
      onMouseEnter={
        hoverable
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 12px 32px rgba(13,71,161,0.12)";
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-2px)";
            }
          : undefined
      }
      onMouseLeave={
        hoverable
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.08)";
              (e.currentTarget as HTMLDivElement).style.transform = "";
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
