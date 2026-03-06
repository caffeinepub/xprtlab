import {
  Building2,
  CheckCircle2,
  Circle,
  FileText,
  FlaskConical,
  Microscope,
  PackageCheck,
  Truck,
} from "lucide-react";
import type React from "react";
import type { SampleStatus } from "../../types/models";

interface SampleWorkflowTimelineProps {
  currentStatus: SampleStatus;
}

const STAGES: Array<{
  status: SampleStatus;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    status: "SAMPLE_COLLECTED",
    label: "Sample Collected",
    icon: <FlaskConical className="h-4 w-4" />,
  },
  {
    status: "DISPATCHED",
    label: "Dispatched",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    status: "RECEIVED_AT_LAB",
    label: "Received at Lab",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    status: "PROCESSING",
    label: "Processing",
    icon: <Microscope className="h-4 w-4" />,
  },
  {
    status: "REPORT_READY",
    label: "Report Ready",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    status: "REPORT_DELIVERED",
    label: "Report Delivered",
    icon: <PackageCheck className="h-4 w-4" />,
  },
];

const STATUS_ORDER: SampleStatus[] = [
  "SAMPLE_COLLECTED",
  "DISPATCHED",
  "RECEIVED_AT_LAB",
  "PROCESSING",
  "REPORT_READY",
  "REPORT_DELIVERED",
];

function getStageIndex(status: SampleStatus): number {
  return STATUS_ORDER.indexOf(status);
}

export default function SampleWorkflowTimeline({
  currentStatus,
}: SampleWorkflowTimelineProps) {
  const currentIndex = getStageIndex(currentStatus);

  return (
    <div className="flex flex-col gap-0">
      {STAGES.map((stage, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        const _isFuture = idx > currentIndex;
        const isDelivered = currentStatus === "REPORT_DELIVERED";

        return (
          <div key={stage.status} className="flex items-start gap-3">
            {/* Icon column */}
            <div className="flex flex-col items-center">
              <div
                className={[
                  "flex items-center justify-center rounded-full transition-all duration-300",
                  isCurrent
                    ? `w-9 h-9 border-[2.5px] shadow-sm ${isDelivered ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-primary bg-primary/10 text-primary"} scale-110`
                    : isCompleted
                      ? "w-8 h-8 bg-emerald-500 text-white"
                      : "w-8 h-8 bg-muted text-muted-foreground opacity-65",
                ].join(" ")}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  stage.icon
                )}
              </div>
              {/* Connector line */}
              {idx < STAGES.length - 1 && (
                <div
                  className={[
                    "w-0.5 h-6 mt-0.5 transition-colors duration-300",
                    isCompleted ? "bg-emerald-400" : "bg-border",
                  ].join(" ")}
                />
              )}
            </div>

            {/* Label column */}
            <div
              className={[
                "pt-1.5 pb-5 text-sm transition-all duration-300",
                isCurrent
                  ? `font-semibold ${isDelivered ? "text-emerald-700" : "text-primary"}`
                  : isCompleted
                    ? "font-medium text-emerald-700"
                    : "text-muted-foreground opacity-65",
              ].join(" ")}
            >
              {stage.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
