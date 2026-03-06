import { cn } from "@/lib/utils";
import type React from "react";

interface MedicalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function MedicalCard({
  children,
  className,
  onClick,
  hoverable,
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
      className={cn(
        "card-medical p-4",
        hoverable &&
          "cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all",
        className,
      )}
    >
      {children}
    </div>
  );
}
