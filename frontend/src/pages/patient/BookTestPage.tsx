import React, { useState } from 'react';
import { useGetAllTests } from '../../hooks/useQueries';
import { FlaskConical, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import GradientButton from '../../components/shared/GradientButton';
import MedicalCard from '../../components/shared/MedicalCard';

type PatientRoute = 'home' | 'book-test' | 'slot-selection' | 'my-bookings' | 'home-collection' | 'my-home-collections' | 'reports' | 'my-vitals' | 'profile';

interface BookTestPageProps {
  onNavigate: (route: PatientRoute, ctx?: { selectedTests?: string[] }) => void;
}

export default function BookTestPage({ onNavigate }: BookTestPageProps) {
  const { data: tests = [], isLoading } = useGetAllTests();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = tests.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const totalPrice = tests
    .filter((t) => selected.includes(t.id))
    .reduce((sum, t) => sum + Number(t.price), 0);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('home')} className="text-muted-foreground hover:text-foreground">
          ←
        </button>
        <h1 className="text-lg font-bold text-foreground">Book a Test</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tests..."
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <FlaskConical className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No tests found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((test) => {
            const isSelected = selected.includes(test.id);
            return (
              <MedicalCard
                key={test.id}
                onClick={() => toggle(test.id)}
                className={`p-4 cursor-pointer transition-all ${isSelected ? 'border-primary/50 bg-primary/5' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{test.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{test.description}</p>
                    <p className="text-sm font-bold text-primary mt-1">₹{Number(test.price)}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-border'}`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </MedicalCard>
            );
          })}
        </div>
      )}

      {selected.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-xl max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">{selected.length} test(s) selected</span>
              <span className="text-sm font-bold text-primary">₹{totalPrice}</span>
            </div>
            <GradientButton
              onClick={() => onNavigate('slot-selection', { selectedTests: selected })}
              className="w-full"
            >
              Select Time Slot <ArrowRight className="w-4 h-4 ml-1" />
            </GradientButton>
          </div>
        </div>
      )}
    </div>
  );
}
