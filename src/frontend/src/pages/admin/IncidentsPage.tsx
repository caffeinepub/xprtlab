import { Loader2, ShieldAlert } from "lucide-react";
import React, { useState } from "react";
import { useGetAllIncidents } from "../../hooks/useQueries";

type SeverityFilter = "all" | "low" | "medium" | "high";

interface IncidentsPageProps {
  onNavigate?: (route: string) => void;
}

export default function IncidentsPage({
  onNavigate: _onNavigate,
}: IncidentsPageProps) {
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");

  const { data: incidents = [], isLoading } = useGetAllIncidents();

  const getSeverityKey = (severity: any): string => {
    if (typeof severity === "string") return severity;
    if (typeof severity === "object" && severity !== null)
      return Object.keys(severity)[0];
    return "low";
  };

  const filtered = incidents.filter((inc: any) => {
    const sev = getSeverityKey(inc.severity);
    return severityFilter === "all" || sev === severityFilter;
  });

  const severityColors: Record<string, string> = {
    low: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    high: "bg-red-100 text-red-700 border-red-200",
  };

  const formatTime = (ts: number) => {
    const ms = ts > 1e12 ? ts / 1_000_000 : ts;
    return new Date(ms).toLocaleString("en-IN");
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-foreground">Incidents</h2>

      {/* Severity Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "low", "medium", "high"] as SeverityFilter[]).map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setSeverityFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              severityFilter === s
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
          <ShieldAlert className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">
            No incidents found
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((incident: any) => {
            const sevKey = getSeverityKey(incident.severity);
            return (
              <div
                key={incident.id}
                className={`bg-white rounded-2xl border shadow-sm p-4 space-y-2 ${severityColors[sevKey] || "border-border"}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${severityColors[sevKey]}`}
                  >
                    {sevKey.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(Number(incident.timestamp))}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {incident.description}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Reporter: {incident.reporter?.toString()}
                </p>
                {incident.photo && (
                  <div className="mt-2">
                    <img
                      src={
                        typeof incident.photo === "string"
                          ? incident.photo
                          : incident.photo?.getDirectURL?.()
                      }
                      alt="Incident"
                      className="w-full max-h-40 object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
