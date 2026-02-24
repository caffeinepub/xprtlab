import React, { useState } from 'react';
import { Heart, Droplets, User, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MedicalCard from '../../components/shared/MedicalCard';
import GradientButton from '../../components/shared/GradientButton';
import { useRecordBPReading, useRecordRBSReading } from '../../hooks/useQueries';
import { Principal } from '@dfinity/principal';
import { toast } from 'sonner';

export default function RecordVitalsPage() {
  const recordBP = useRecordBPReading();
  const recordRBS = useRecordRBSReading();

  const [patientPrincipal, setPatientPrincipal] = useState('');
  const [bookingId, setBookingId] = useState('');

  // BP fields
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');

  // RBS fields
  const [glucose, setGlucose] = useState('');

  const parsePrincipal = (): Principal | null => {
    try {
      return Principal.fromText(patientPrincipal.trim());
    } catch {
      return null;
    }
  };

  const handleBPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pid = parsePrincipal();
    if (!pid) {
      toast.error('Invalid patient principal ID');
      return;
    }
    if (!systolic || !diastolic || !pulse || !bookingId) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await recordBP.mutateAsync({
        patientId: pid,
        bookingId: bookingId.trim(),
        systolic: BigInt(systolic),
        diastolic: BigInt(diastolic),
        pulse: BigInt(pulse),
      });
      toast.success('BP reading recorded successfully');
      setSystolic('');
      setDiastolic('');
      setPulse('');
    } catch {
      toast.error('Failed to record BP reading');
    }
  };

  const handleRBSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pid = parsePrincipal();
    if (!pid) {
      toast.error('Invalid patient principal ID');
      return;
    }
    if (!glucose || !bookingId) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await recordRBS.mutateAsync({
        patientId: pid,
        bookingId: bookingId.trim(),
        glucoseLevel: BigInt(glucose),
      });
      toast.success('RBS reading recorded successfully');
      setGlucose('');
    } catch {
      toast.error('Failed to record RBS reading');
    }
  };

  return (
    <div className="px-4 py-5 space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Record Vitals</h1>
        <p className="text-sm text-muted-foreground">Enter patient BP and blood sugar readings</p>
      </div>

      {/* Patient Info */}
      <MedicalCard>
        <h2 className="text-sm font-bold text-foreground mb-3">Patient Information</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Patient Principal ID</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="e.g. aaaaa-aa..."
                value={patientPrincipal}
                onChange={(e) => setPatientPrincipal(e.target.value)}
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
                className="pl-9 rounded-xl"
              />
            </div>
          </div>
        </div>
      </MedicalCard>

      <Tabs defaultValue="bp">
        <TabsList className="w-full rounded-xl">
          <TabsTrigger value="bp" className="flex-1 rounded-xl">
            <Heart className="w-4 h-4 mr-1.5" />
            Blood Pressure
          </TabsTrigger>
          <TabsTrigger value="rbs" className="flex-1 rounded-xl">
            <Droplets className="w-4 h-4 mr-1.5" />
            Blood Sugar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bp" className="mt-4">
          <MedicalCard>
            <form onSubmit={handleBPSubmit} className="space-y-4">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Blood Pressure Reading
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Systolic</Label>
                  <Input
                    type="number"
                    placeholder="120"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    min="60"
                    max="250"
                    required
                    className="rounded-xl text-center"
                  />
                  <p className="text-[10px] text-muted-foreground text-center">mmHg</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Diastolic</Label>
                  <Input
                    type="number"
                    placeholder="80"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    min="40"
                    max="150"
                    required
                    className="rounded-xl text-center"
                  />
                  <p className="text-[10px] text-muted-foreground text-center">mmHg</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Pulse</Label>
                  <Input
                    type="number"
                    placeholder="72"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    min="40"
                    max="200"
                    required
                    className="rounded-xl text-center"
                  />
                  <p className="text-[10px] text-muted-foreground text-center">bpm</p>
                </div>
              </div>
              <GradientButton
                type="submit"
                loading={recordBP.isPending}
                className="w-full"
              >
                Record BP Reading
              </GradientButton>
            </form>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="rbs" className="mt-4">
          <MedicalCard>
            <form onSubmit={handleRBSSubmit} className="space-y-4">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                Random Blood Sugar
              </h2>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Glucose Level (mg/dL)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 95"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  min="20"
                  max="600"
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-green-50 rounded-xl p-2">
                  <p className="font-bold text-green-700">&lt;100</p>
                  <p className="text-green-600">Normal</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-2">
                  <p className="font-bold text-yellow-700">100–125</p>
                  <p className="text-yellow-600">Pre-diabetic</p>
                </div>
                <div className="bg-red-50 rounded-xl p-2">
                  <p className="font-bold text-red-700">≥126</p>
                  <p className="text-red-600">Diabetic</p>
                </div>
              </div>
              <GradientButton
                type="submit"
                loading={recordRBS.isPending}
                className="w-full"
              >
                Record RBS Reading
              </GradientButton>
            </form>
          </MedicalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
