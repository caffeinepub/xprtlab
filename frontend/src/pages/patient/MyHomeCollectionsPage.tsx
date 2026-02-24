import React from 'react';
import { useGetMyHomeCollectionRequests } from '../../hooks/useQueries';
import { Home, Clock, MapPin } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import MedicalCard from '../../components/shared/MedicalCard';

type PatientRoute = 'home' | 'book-test' | 'slot-selection' | 'my-bookings' | 'home-collection' | 'my-home-collections' | 'reports' | 'my-vitals' | 'profile';

interface MyHomeCollectionsPageProps {
  onNavigate: (route: PatientRoute) => void;
}

export default function MyHomeCollectionsPage({ onNavigate }: MyHomeCollectionsPageProps) {
  const { data: requests = [], isLoading } = useGetMyHomeCollectionRequests();

  const sorted = [...requests].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('home')} className="text-muted-foreground hover:text-foreground">
          ←
        </button>
        <h1 className="text-lg font-bold text-foreground">Home Collections</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Home className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No home collection requests</p>
          <p className="text-sm mt-1">Request a home collection to get started</p>
          <button
            onClick={() => onNavigate('home-collection')}
            className="mt-4 text-primary text-sm font-medium underline"
          >
            Request Collection
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((req) => (
            <MedicalCard key={req.id} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground">#{req.id.slice(-8)}</span>
                <StatusBadge status={req.status as any} />
              </div>
              <div className="flex items-start gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{req.address}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {req.tests.map((t) => (
                  <span key={t.id} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                    {t.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{req.slot}</span>
              </div>
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
