import React, { useState } from 'react';
import { useCreateBooking } from '../../hooks/useQueries';
import { useGetAllTests } from '../../hooks/useQueries';
import { Clock, CheckCircle2 } from 'lucide-react';
import GradientButton from '../../components/shared/GradientButton';
import { toast } from 'sonner';

type PatientRoute = 'home' | 'book-test' | 'slot-selection' | 'my-bookings' | 'home-collection' | 'my-home-collections' | 'reports' | 'my-vitals' | 'profile';

interface SlotSelectionPageProps {
  selectedTests: string[];
  onNavigate: (route: PatientRoute) => void;
}

const TIME_SLOTS = [
  '7:00 AM – 8:00 AM',
  '8:00 AM – 9:00 AM',
  '9:00 AM – 10:00 AM',
  '10:00 AM – 11:00 AM',
  '11:00 AM – 12:00 PM',
  '2:00 PM – 3:00 PM',
  '3:00 PM – 4:00 PM',
  '4:00 PM – 5:00 PM',
];

export default function SlotSelectionPage({ selectedTests, onNavigate }: SlotSelectionPageProps) {
  const { data: allTests = [] } = useGetAllTests();
  const createBooking = useCreateBooking();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const chosenTests = allTests.filter((t) => selectedTests.includes(t.id));
  const totalPrice = chosenTests.reduce((sum, t) => sum + Number(t.price), 0);

  const handleBook = async () => {
    if (!selectedSlot) return;
    const id = `booking-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    try {
      await createBooking.mutateAsync({ id, selectedTests: chosenTests, slot: selectedSlot });
      toast.success('Booking confirmed!');
      onNavigate('my-bookings');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to create booking');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('book-test')} className="text-muted-foreground hover:text-foreground">
          ←
        </button>
        <h1 className="text-lg font-bold text-foreground">Select Time Slot</h1>
      </div>

      {/* Selected Tests Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-3">
        <p className="text-xs font-semibold text-primary mb-1">{chosenTests.length} test(s) selected</p>
        <div className="flex flex-wrap gap-1">
          {chosenTests.map((t) => (
            <span key={t.id} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {t.name}
            </span>
          ))}
        </div>
        <p className="text-sm font-bold text-primary mt-2">Total: ₹{totalPrice}</p>
      </div>

      {/* Time Slots */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Available Slots (Today)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <GradientButton
        onClick={handleBook}
        loading={createBooking.isPending}
        disabled={!selectedSlot}
        className="w-full"
        size="lg"
      >
        Confirm Booking
      </GradientButton>
    </div>
  );
}
