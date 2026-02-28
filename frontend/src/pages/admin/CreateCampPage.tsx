import React, { useState } from 'react';
import { MapPin, Calendar, Tag, QrCode, Copy, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MedicalCard from '../../components/shared/MedicalCard';
import GradientButton from '../../components/shared/GradientButton';
import { toast } from 'sonner';

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

interface CampData {
  id: string;
  name: string;
  date: string;
  location: string;
}

export default function CreateCampPage() {
  const [campName, setCampName] = useState('');
  const [campDate, setCampDate] = useState('');
  const [campLocation, setCampLocation] = useState('');
  const [createdCamp, setCreatedCamp] = useState<CampData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName.trim() || !campDate || !campLocation.trim()) return;

    const camp: CampData = {
      id: generateId(),
      name: campName.trim(),
      date: campDate,
      location: campLocation.trim(),
    };

    const existing = JSON.parse(localStorage.getItem('xprtlab_camps') || '[]');
    localStorage.setItem('xprtlab_camps', JSON.stringify([...existing, camp]));

    setCreatedCamp(camp);
    toast.success('Camp created successfully!');
  };

  const handleCopyId = () => {
    if (createdCamp) {
      navigator.clipboard.writeText(createdCamp.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Camp ID copied!');
    }
  };

  if (createdCamp) {
    return (
      <div className="px-4 py-5 space-y-5 animate-fade-in">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Camp Created!</h1>
          <p className="text-sm text-muted-foreground mt-1">{createdCamp.name}</p>
        </div>

        <MedicalCard className="text-center">
          <p className="text-xs font-semibold text-muted-foreground mb-3">QR Code for Check-in</p>
          <div className="w-48 h-48 mx-auto bg-white border-2 border-border rounded-xl flex items-center justify-center mb-3 p-4">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-brand-blue mx-auto mb-2" />
              <p className="text-xs font-mono text-muted-foreground break-all">{createdCamp.id.slice(0, 16)}...</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Share this QR code with phlebotomists for camp check-in
          </p>
          <button
            onClick={handleCopyId}
            className="flex items-center gap-2 mx-auto text-xs font-semibold text-brand-blue hover:opacity-80 transition-opacity"
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Camp ID'}
          </button>
        </MedicalCard>

        <MedicalCard>
          <h2 className="text-sm font-bold text-foreground mb-3">Camp Details</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Tag className="w-4 h-4 text-brand-blue" />
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{createdCamp.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-brand-blue" />
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{createdCamp.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-brand-blue" />
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{createdCamp.location}</span>
            </div>
          </div>
        </MedicalCard>

        <GradientButton
          onClick={() => {
            setCreatedCamp(null);
            setCampName('');
            setCampDate('');
            setCampLocation('');
          }}
          className="w-full"
        >
          Create Another Camp
        </GradientButton>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Create Camp</h1>
        <p className="text-sm text-muted-foreground">Set up a society health camp event</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <MedicalCard>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Camp Name</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="e.g. Sector 12 Health Camp"
                  value={campName}
                  onChange={(e) => setCampName(e.target.value)}
                  required
                  className="pl-9 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Camp Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={campDate}
                  onChange={(e) => setCampDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-9 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="e.g. Community Hall, Sector 12, Noida"
                  value={campLocation}
                  onChange={(e) => setCampLocation(e.target.value)}
                  required
                  className="pl-9 rounded-xl"
                />
              </div>
            </div>
          </div>
        </MedicalCard>

        <GradientButton
          type="submit"
          disabled={!campName.trim() || !campDate || !campLocation.trim()}
          className="w-full"
          size="lg"
        >
          <QrCode className="w-4 h-4" />
          Create Camp & Generate QR
        </GradientButton>
      </form>
    </div>
  );
}
