import React, { useState } from 'react';
import { useRecordBPReading, useRecordRBSReading } from '../../hooks/useQueries';
import { Loader2, Activity, Heart } from 'lucide-react';

export default function RecordVitalsPage() {
  const [activeTab, setActiveTab] = useState<'bp' | 'rbs'>('bp');

  // BP form
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');

  // RBS form
  const [glucose, setGlucose] = useState('');

  const recordBPMutation = useRecordBPReading();
  const recordRBSMutation = useRecordRBSReading();

  const handleBPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!systolic || !diastolic || !pulse) return;
    try {
      await recordBPMutation.mutateAsync({
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic),
        pulse: parseInt(pulse),
      });
      setSystolic('');
      setDiastolic('');
      setPulse('');
    } catch (err) {
      console.error('Failed to record BP', err);
    }
  };

  const handleRBSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!glucose) return;
    try {
      await recordRBSMutation.mutateAsync({ glucoseLevel: parseInt(glucose) });
      setGlucose('');
    } catch (err) {
      console.error('Failed to record RBS', err);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-foreground">Record Vitals</h2>

      {/* Tabs */}
      <div className="flex gap-2 bg-muted rounded-xl p-1">
        <button
          onClick={() => setActiveTab('bp')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'bp' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Blood Pressure
        </button>
        <button
          onClick={() => setActiveTab('rbs')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'rbs' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Blood Glucose
        </button>
      </div>

      {/* BP Form */}
      {activeTab === 'bp' && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-red-500" />
            <h3 className="font-bold text-sm text-foreground">Blood Pressure Reading</h3>
          </div>
          <form onSubmit={handleBPSubmit} className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Systolic</label>
                <input
                  type="number"
                  value={systolic}
                  onChange={e => setSystolic(e.target.value)}
                  placeholder="120"
                  min="60" max="250"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Diastolic</label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={e => setDiastolic(e.target.value)}
                  placeholder="80"
                  min="40" max="150"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Pulse</label>
                <input
                  type="number"
                  value={pulse}
                  onChange={e => setPulse(e.target.value)}
                  placeholder="72"
                  min="40" max="200"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={recordBPMutation.isPending}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {recordBPMutation.isPending ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Recording...</>
              ) : 'Record BP'}
            </button>
            {recordBPMutation.isSuccess && (
              <p className="text-xs text-green-600 font-semibold text-center">BP recorded successfully!</p>
            )}
          </form>
        </div>
      )}

      {/* RBS Form */}
      {activeTab === 'rbs' && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-blue-500" />
            <h3 className="font-bold text-sm text-foreground">Blood Glucose (RBS)</h3>
          </div>
          <form onSubmit={handleRBSSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Glucose Level (mg/dL)</label>
              <input
                type="number"
                value={glucose}
                onChange={e => setGlucose(e.target.value)}
                placeholder="100"
                min="20" max="600"
                required
                className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              disabled={recordRBSMutation.isPending}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {recordRBSMutation.isPending ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Recording...</>
              ) : 'Record Glucose'}
            </button>
            {recordRBSMutation.isSuccess && (
              <p className="text-xs text-green-600 font-semibold text-center">Glucose recorded successfully!</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
