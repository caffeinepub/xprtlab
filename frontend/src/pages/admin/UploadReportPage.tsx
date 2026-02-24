import React, { useState, useRef } from 'react';
import { Upload, FileText, User, Hash, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MedicalCard from '../../components/shared/MedicalCard';
import GradientButton from '../../components/shared/GradientButton';
import { useUploadReport } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';
import { generateId } from '../../utils/formatters';
import { Principal } from '@dfinity/principal';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

type StaffRoute = 'tasks' | 'home-collections' | 'record-vitals' | 'scan-qr' | 'admin-bookings' | 'admin-reports' | 'upload-report' | 'incidents' | 'audit-logs' | 'create-camp' | 'submit-incident' | 'profile';

interface UploadReportPageProps {
  onNavigate: (route: StaffRoute) => void;
}

export default function UploadReportPage({ onNavigate }: UploadReportPageProps) {
  const uploadReport = useUploadReport();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [patientPrincipal, setPatientPrincipal] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !patientPrincipal.trim() || !bookingId.trim()) return;

    let patient: Principal;
    try {
      patient = Principal.fromText(patientPrincipal.trim());
    } catch {
      toast.error('Invalid patient principal ID');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      const id = generateId();
      await uploadReport.mutateAsync({
        id,
        patient,
        bookingId: bookingId.trim(),
        file: blob,
      });

      toast.success('Report uploaded successfully');
      onNavigate('admin-reports');
    } catch {
      toast.error('Failed to upload report');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="px-4 py-5 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('admin-reports')} className="text-muted-foreground hover:text-foreground">
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Upload Report</h1>
          <p className="text-sm text-muted-foreground">Upload PDF lab report for a patient</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <MedicalCard>
          <h2 className="text-sm font-bold text-foreground mb-3">Patient Details</h2>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Patient Principal ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="e.g. aaaaa-aa..."
                  value={patientPrincipal}
                  onChange={(e) => setPatientPrincipal(e.target.value)}
                  required
                  className="pl-9 rounded-xl font-mono text-xs"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Booking ID</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter booking ID"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  required
                  className="pl-9 rounded-xl"
                />
              </div>
            </div>
          </div>
        </MedicalCard>

        {/* File Upload */}
        <MedicalCard>
          <h2 className="text-sm font-bold text-foreground mb-3">PDF Report</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 transition-colors ${
              selectedFile
                ? 'border-brand-blue bg-gradient-primary-soft'
                : 'border-border hover:border-brand-blue/50'
            }`}
          >
            {selectedFile ? (
              <>
                <CheckCircle className="w-8 h-8 text-brand-blue" />
                <p className="text-sm font-semibold text-brand-blue">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB · Click to change
                </p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Tap to select PDF</p>
                <p className="text-xs text-muted-foreground">Only PDF files are accepted</p>
              </>
            )}
          </button>

          {isUploading && uploadProgress > 0 && (
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </MedicalCard>

        <GradientButton
          type="submit"
          loading={isUploading}
          disabled={!selectedFile || !patientPrincipal.trim() || !bookingId.trim()}
          className="w-full"
          size="lg"
        >
          <FileText className="w-4 h-4" />
          Upload Report
        </GradientButton>
      </form>
    </div>
  );
}
