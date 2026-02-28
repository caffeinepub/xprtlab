import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MedicalCard from '../../components/shared/MedicalCard';
import GradientButton from '../../components/shared/GradientButton';
import { useUploadReport } from '../../hooks/useQueries';
import { toast } from 'sonner';

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

type StaffRoute = 'tasks' | 'home-collections' | 'record-vitals' | 'scan-qr' | 'admin-bookings' | 'admin-reports' | 'upload-report' | 'incidents' | 'audit-logs' | 'create-camp' | 'submit-incident' | 'profile';

interface UploadReportPageProps {
  onNavigate: (route: StaffRoute) => void;
}

export default function UploadReportPage({ onNavigate }: UploadReportPageProps) {
  const [bookingId, setBookingId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadReport();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !bookingId.trim() || !patientId.trim()) return;

    try {
      setUploadProgress(0);
      const reportId = generateId();

      await uploadMutation.mutateAsync({
        reportId,
        bookingId: bookingId.trim(),
        patientId: patientId.trim(),
        file: selectedFile,
        onProgress: (pct: number) => setUploadProgress(pct),
      });

      toast.success('Report uploaded successfully!');
      onNavigate('admin-reports');
    } catch (err) {
      toast.error('Failed to upload report. Please try again.');
    }
  };

  if (uploadMutation.isSuccess) {
    return (
      <div className="px-4 py-5 space-y-5 animate-fade-in">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Report Uploaded!</h2>
          <p className="text-sm text-muted-foreground mt-2">
            The lab report has been successfully uploaded and is now available to the patient.
          </p>
        </div>
        <GradientButton onClick={() => onNavigate('admin-reports')} className="w-full">
          View All Reports
        </GradientButton>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('admin-reports')} className="text-muted-foreground hover:text-foreground">
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Upload Report</h1>
          <p className="text-sm text-muted-foreground">Upload a PDF lab report for a patient</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <MedicalCard>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Booking ID</Label>
              <Input
                placeholder="Enter booking ID"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Patient Principal ID</Label>
              <Input
                placeholder="Enter patient principal ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
          </div>
        </MedicalCard>

        <MedicalCard>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              selectedFile
                ? 'border-brand-blue bg-gradient-primary-soft'
                : 'border-border hover:border-brand-blue/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-brand-blue flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Click to select PDF</p>
                <p className="text-xs text-muted-foreground mt-1">Maximum file size: 10MB</p>
              </>
            )}
          </div>

          {uploadMutation.isPending && uploadProgress > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </MedicalCard>

        {uploadMutation.isError && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Upload failed. Please try again.</span>
          </div>
        )}

        <GradientButton
          type="submit"
          loading={uploadMutation.isPending}
          disabled={!selectedFile || !bookingId.trim() || !patientId.trim()}
          className="w-full"
          size="lg"
        >
          <Upload className="w-4 h-4" />
          Upload Report
        </GradientButton>
      </form>
    </div>
  );
}
