import { AlertTriangle, Camera, CheckCircle, Loader2, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { useSubmitIncident } from "../../hooks/useQueries";

type Severity = "low" | "medium" | "high";

interface SubmitIncidentPageProps {
  onNavigate?: (route: string) => void;
}

export default function SubmitIncidentPage({
  onNavigate,
}: SubmitIncidentPageProps) {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("low");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitMutation = useSubmitIncident();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    try {
      await submitMutation.mutateAsync({
        description,
        severity,
        photo: photoFile,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit incident", err);
    }
  };

  const severityColors: Record<Severity, string> = {
    low: "bg-green-50 border-green-300 text-green-700",
    medium: "bg-yellow-50 border-yellow-300 text-yellow-700",
    high: "bg-red-50 border-red-300 text-red-700",
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-lg font-bold text-foreground">
          Incident Submitted
        </h2>
        <p className="text-sm text-muted-foreground">
          Your incident report has been submitted successfully.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setDescription("");
              setPhotoFile(null);
              setPhotoPreview(null);
              setSeverity("low");
            }}
            className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-sm"
          >
            Submit Another
          </button>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("tasks")}
              className="px-4 py-2 rounded-xl border border-border text-sm font-semibold text-foreground"
            >
              Back to Tasks
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-foreground">Submit Incident</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Severity */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
          <label
            htmlFor="incident-severity"
            className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
          >
            Severity *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["low", "medium", "high"] as Severity[]).map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSeverity(s)}
                className={`py-2 rounded-xl border font-semibold text-xs transition-colors ${
                  severity === s
                    ? severityColors[s]
                    : "border-border text-muted-foreground hover:bg-muted/30"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2">
          <label
            htmlFor="incident-description"
            className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
          >
            Description *
          </label>
          <textarea
            id="incident-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the incident in detail..."
            rows={4}
            required
            className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        {/* Photo */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Photo (Optional)
          </p>
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Incident"
                className="w-full rounded-xl object-cover max-h-48"
              />
              <button
                type="button"
                onClick={() => {
                  setPhotoFile(null);
                  setPhotoPreview(null);
                }}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 rounded-xl border-2 border-dashed border-border text-muted-foreground flex flex-col items-center gap-2 hover:bg-muted/30 transition-colors"
            >
              <Camera className="h-6 w-6" />
              <span className="text-xs font-semibold">Tap to add photo</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitMutation.isPending || !description.trim()}
          className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4" /> Submit Incident
            </>
          )}
        </button>
      </form>
    </div>
  );
}
