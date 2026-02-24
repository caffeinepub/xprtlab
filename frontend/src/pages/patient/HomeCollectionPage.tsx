import React, { useState } from 'react';
import { MapPin, Clock, FlaskConical, Navigation, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MedicalCard from '../../components/shared/MedicalCard';
import GradientButton from '../../components/shared/GradientButton';
import { useGetAllTests, useCreateHomeCollection } from '../../hooks/useQueries';
import { generateId, formatCurrency } from '../../utils/formatters';
import type { Test } from '../../types/models';
import { toast } from 'sonner';

const TIME_SLOTS = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

type GpsState = 'idle' | 'loading' | 'success' | 'error';

interface NominatimAddress {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  village?: string;
  town?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

interface NominatimResponse {
  display_name: string;
  address: NominatimAddress;
}

function formatNominatimAddress(addr: NominatimAddress): string {
  const parts: string[] = [];
  if (addr.house_number) parts.push(addr.house_number);
  if (addr.road) parts.push(addr.road);
  if (addr.neighbourhood) parts.push(addr.neighbourhood);
  else if (addr.suburb) parts.push(addr.suburb);
  const city = addr.city || addr.town || addr.village || addr.county;
  if (city) parts.push(city);
  if (addr.state) parts.push(addr.state);
  if (addr.postcode) parts.push(addr.postcode);
  if (addr.country) parts.push(addr.country);
  return parts.join(', ');
}

type PatientRoute = 'home' | 'book-test' | 'slot-selection' | 'my-bookings' | 'home-collection' | 'my-home-collections' | 'reports' | 'my-vitals' | 'profile';

interface HomeCollectionPageProps {
  onNavigate: (route: PatientRoute) => void;
}

export default function HomeCollectionPage({ onNavigate }: HomeCollectionPageProps) {
  const { data: tests = [] } = useGetAllTests();
  const createRequest = useCreateHomeCollection();

  const [address, setAddress] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [gpsState, setGpsState] = useState<GpsState>('idle');
  const [gpsError, setGpsError] = useState<string>('');

  const toggleTest = (test: Test) => {
    setSelectedTests((prev) =>
      prev.find((t) => t.id === test.id)
        ? prev.filter((t) => t.id !== test.id)
        : [...prev, test]
    );
  };

  const totalPrice = selectedTests.reduce((s, t) => s + Number(t.price), 0);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGpsState('error');
      setGpsError('Geolocation is not supported by your browser.');
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setGpsState('loading');
    setGpsError('');
    setLatitude(null);
    setLongitude(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
              headers: {
                'Accept-Language': 'en',
                'User-Agent': 'XpertLab/1.0',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Reverse geocoding request failed');
          }

          const data: NominatimResponse = await response.json();

          const formattedAddress = data.address
            ? formatNominatimAddress(data.address)
            : data.display_name;

          setAddress(formattedAddress || data.display_name);
          setLatitude(lat);
          setLongitude(lon);
          setGpsState('success');
        } catch {
          setLatitude(lat);
          setLongitude(lon);
          setGpsState('success');
          toast.error('Could not fetch address details. Please verify or edit the address manually.');
        }
      },
      (error) => {
        setGpsState('error');
        let msg = 'Unable to retrieve location. Please enter address manually.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Location access denied. Please enter address manually.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Location information is unavailable. Please enter address manually.';
            break;
          case error.TIMEOUT:
            msg = 'Location request timed out. Please try again.';
            break;
        }
        setGpsError(msg);
        toast.error(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !selectedSlot || selectedTests.length === 0) return;
    const id = generateId();
    try {
      await createRequest.mutateAsync({
        id,
        address: address.trim(),
        latitude,
        longitude,
        selectedTests,
        slot: selectedSlot,
      });
      toast.success('Home collection request submitted!');
      onNavigate('my-home-collections');
    } catch {
      toast.error('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="px-4 py-5 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('home')} className="text-muted-foreground hover:text-foreground">
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Home Collection</h1>
          <p className="text-sm text-muted-foreground">We'll come to you for sample collection</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Address */}
        <MedicalCard>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-brand-blue" />
            <h2 className="text-sm font-bold text-foreground">Collection Address</h2>
          </div>

          <Textarea
            placeholder="Enter your full address including flat/house number, street, city, pincode..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
            className="rounded-xl resize-none mb-3"
          />

          {/* GPS Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUseMyLocation}
            disabled={gpsState === 'loading'}
            className="w-full rounded-xl border-brand-blue/40 text-brand-blue hover:bg-gradient-primary-soft hover:border-brand-blue gap-2"
          >
            {gpsState === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
            {gpsState === 'loading' ? 'Fetching Location & Address...' : 'Use My Location (GPS)'}
          </Button>

          {/* GPS Success */}
          {gpsState === 'success' && latitude !== null && longitude !== null && (
            <div className="mt-2 flex items-start gap-2 rounded-xl bg-gradient-primary-soft border border-brand-blue/20 px-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-brand-blue">GPS Location Captured</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Address auto-filled above — you can edit if needed.</p>
              </div>
            </div>
          )}

          {/* GPS Error */}
          {gpsState === 'error' && (
            <div className="mt-2 flex items-start gap-2 rounded-xl bg-destructive/10 border border-destructive/20 px-3 py-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-xs text-destructive">{gpsError}</p>
            </div>
          )}
        </MedicalCard>

        {/* Select Tests */}
        <div>
          <h2 className="text-sm font-bold text-foreground mb-3">Select Tests</h2>
          <div className="space-y-2">
            {tests.map((test) => {
              const selected = !!selectedTests.find((t) => t.id === test.id);
              return (
                <button
                  key={test.id}
                  type="button"
                  onClick={() => toggleTest(test)}
                  className={`w-full text-left rounded-card p-3 border-2 transition-all flex items-center gap-3 ${
                    selected
                      ? 'border-brand-blue bg-gradient-primary-soft'
                      : 'border-border bg-card hover:border-brand-blue/40'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? 'gradient-primary' : 'bg-muted'}`}>
                    <FlaskConical className={`w-4 h-4 ${selected ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{test.name}</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(test.price)}</p>
                  </div>
                  {selected && (
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-brand-blue" />
            <h2 className="text-sm font-bold text-foreground">Preferred Time</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${
                  selectedSlot === slot
                    ? 'gradient-primary text-white border-transparent'
                    : 'border-border text-foreground hover:border-brand-blue/40'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Summary & Submit */}
        {selectedTests.length > 0 && selectedSlot && (
          <MedicalCard className="bg-gradient-primary-soft border-brand-blue/20">
            <p className="text-xs font-semibold text-brand-blue mb-1">Order Summary</p>
            <p className="text-sm text-foreground">{selectedTests.map((t) => t.name).join(', ')}</p>
            <p className="text-sm font-bold gradient-primary-text mt-1">{formatCurrency(totalPrice)}</p>
          </MedicalCard>
        )}

        <GradientButton
          type="submit"
          loading={createRequest.isPending}
          disabled={!address.trim() || !selectedSlot || selectedTests.length === 0}
          className="w-full"
          size="lg"
        >
          Request Home Collection
        </GradientButton>

        {createRequest.isError && (
          <p className="text-destructive text-sm text-center">Failed to submit request. Please try again.</p>
        )}
      </form>
    </div>
  );
}
