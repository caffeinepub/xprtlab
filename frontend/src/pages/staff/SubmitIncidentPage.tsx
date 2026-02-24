import React, { useState, useRef } from 'react';
import { AlertTriangle, Camera, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import MedicalCard from '../../components/shared/MedicalCard';
import GradientButton from '../../components/shared/GradientButton';
import { useSubmitIncident } from '../../hooks/useQueries';
import { ExternalBlob, Variant_low_high_medium } from '../../backend';
import { generateId } from '../../utils/formatters';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

type StaffRoute = 'tasks' | 'home-collections' | 'record-vitals' | 'scan-qr' | 'admin-bookings' | 'admin-reports' | 'upload-report' | 'incidents' | 'audit-logs' | 'create-camp' | 'submit-incident' | 'profile';

interface SubmitIncidentPageProps {
  onNavigate?: (route: StaffRoute) => void;
}

export default function SubmitIncidentPage({ onNavigate }: SubmitIncidentPageProps) {
  const submitIncident = useSubmitIncident();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Variant_low_high_medium>(Variant_low_high_medium.low);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let photoBlob: ExternalBlob | null = null;

      if (photoFile) {
        const arrayBuffer = await photoFile.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        photoBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setUploadProgress(pct);
        });
      }

      const id = generateId();
      await submitIncident.mutateAsync({
        id,
        description: description.trim(),
        severity,
        photo: photoBlob,
      });

      toast.success('Incident reported successfully');
      if (onNavigate) {
        onNavigate('profile');
      }
    } catch {
      toast.error('Failed to submit incident report');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const severityColors = {
    [Variant_low_high_medium.low]: 'border-green-300 bg-green-50 text-green-700',
    [Variant_low_high_medium.medium]: 'border-yellow-300 bg-yellow-50 text-yellow-700',
    [Variant_low_high_medium.high]: 'border-red-300 bg-red-50 text-red-700',
  };

  return (
    <div className="px-4 py-5 space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Report Incident</h1>
        <p className="text-sm text-muted-foreground">Submit an incident report for review</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Severity */}
        <MedicalCard>
          <h2 className="text-sm font-bold text-foreground mb-3">Severity Level</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: Variant_low_high_medium.low, label: 'Low', desc: 'Minor issue' },
              { value: Variant_low_high_medium.medium, label: 'Medium', desc: 'Moderate impact' },
              { value: Variant_low_high_medium.high, label: 'High', desc: 'Critical issue' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSeverity(opt.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  severity === opt.value
                    ? severityColors[opt.value]
                    : 'border-border hover:border-muted-foreground/30'
                }`}
              >
                <p className="text-sm font-bold">{opt.label}</p>
                <p className="text-[10px] opacity-70 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </MedicalCard>

        {/* Description */}
        <MedicalCard>
          <div className="space-y-1.5">
            <Label className="text-sm font-bold">Description</Label>
            <Textarea
              placeholder="Describe the incident in detail — what happened, when, where, and who was involved..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              className="rounded-xl resize-none"
            />
          </div>
        </MedicalCard>

        {/* Photo */}
        <MedicalCard>
          <h2 className="text-sm font-bold text-foreground mb-3">Photo (Optional)</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Incident photo"
                className="w-full h-40 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-brand-blue/50 transition-colors"
            >
              <Camera className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Add Photo</p>
              <p className="text-xs text-muted-foreground">Tap to capture or select</p>
            </button>
          )}

          {isSubmitting && photoFile && uploadProgress > 0 && (
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uploading photo...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </MedicalCard>

        <GradientButton
          type="submit"
          loading={isSubmitting}
          disabled={!description.trim()}
          className="w-full"
          size="lg"
        >
          <AlertTriangle className="w-4 h-4" />
          Submit Incident Report
        </GradientButton>
      </form>
    </div>
  );
}
