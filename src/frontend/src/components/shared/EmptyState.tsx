import type React from "react";

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-12 ${className}`}
      data-ocid="empty_state"
    >
      <span
        className="text-4xl mb-4 leading-none select-none"
        role="img"
        aria-hidden="true"
      >
        {icon}
      </span>
      <h3
        className="font-bold text-foreground mb-1.5"
        style={{ fontSize: "16px" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-muted-foreground max-w-xs leading-relaxed"
          style={{ fontSize: "14px" }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
