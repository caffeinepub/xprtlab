import { Plus } from "lucide-react";
import React from "react";

interface PageHeroHeaderProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function PageHeroHeader({
  title,
  description,
  actionLabel,
  onAction,
}: PageHeroHeaderProps) {
  return (
    <div
      data-ocid="page.hero.section"
      style={{
        background: "linear-gradient(135deg, #F5F7FF, #EDF2FF)",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "18px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#111827",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              marginTop: "4px",
              marginBottom: 0,
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        </div>

        {actionLabel && onAction && (
          <button
            type="button"
            data-ocid="page.hero.primary_button"
            onClick={onAction}
            style={{
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563EB, #1976D2)",
              color: "white",
              fontWeight: 600,
              padding: "0 16px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              boxShadow: "0 2px 8px rgba(13,71,161,0.3)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.02)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 16px rgba(13,71,161,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 2px 8px rgba(13,71,161,0.3)";
            }}
          >
            <Plus size={16} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
