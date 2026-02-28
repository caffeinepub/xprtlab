import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapPin, Navigation, Clock, CheckCircle, User, Phone, TestTube, Calendar } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import {
  seedDemoHomeCollections,
  getDemoHomeCollections,
  updateDemoHomeCollectionStatus,
  DemoHomeCollection,
  HomeCollectionStatus,
} from '../../utils/demoData';
import { formatPremiumTimeDisplay } from '../../utils/formatters';
import { haversineDistance } from '../../utils/geoHelpers';

interface HomeCollectionQueuePageProps {
  isDemoMode?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNextStatus(current: HomeCollectionStatus): HomeCollectionStatus | null {
  switch (current) {
    case 'ASSIGNED':
      return 'EN_ROUTE';
    case 'EN_ROUTE':
      return 'SAMPLE_COLLECTED';
    case 'SAMPLE_COLLECTED':
      return 'COMPLETED';
    default:
      return null;
  }
}

function getActionLabel(current: HomeCollectionStatus): string | null {
  switch (current) {
    case 'ASSIGNED':
      return 'Start Visit';
    case 'EN_ROUTE':
      return 'Mark Arrived';
    case 'SAMPLE_COLLECTED':
      return 'Complete Visit';
    default:
      return null;
  }
}

function buildMapsUrl(lat?: number, lng?: number, address?: string): string {
  if (lat !== undefined && lng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address ?? '')}`;
}

// ─── Daily Overview Card ──────────────────────────────────────────────────────

interface OverviewCardProps {
  collections: DemoHomeCollection[];
}

const DailyOverviewCard: React.FC<OverviewCardProps> = ({ collections }) => {
  const total = collections.length;
  const completed = collections.filter((c) => c.status === 'COMPLETED').length;
  const pending = total - completed;
  const active = collections.some((c) => c.status === 'EN_ROUTE' || c.status === 'SAMPLE_COLLECTED');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Today's Overview
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-3">
          <span className="text-2xl font-bold text-gray-800">{total}</span>
          <span className="text-xs text-gray-500 mt-0.5">Total</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-emerald-50 rounded-xl p-3">
          <span className="text-2xl font-bold text-emerald-700">{completed}</span>
          <span className="text-xs text-emerald-600 mt-0.5">Completed</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-amber-50 rounded-xl p-3">
          <span className="text-2xl font-bold text-amber-700">{pending}</span>
          <span className="text-xs text-amber-600 mt-0.5">Pending</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-3">
          <span className={`text-xs font-semibold mt-0.5 ${active ? 'text-blue-700' : 'text-gray-500'}`}>
            {active ? '🟢 Active' : '⚪ Inactive'}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">Shift</span>
        </div>
      </div>
    </div>
  );
};

// ─── Collection Card ──────────────────────────────────────────────────────────

interface CollectionCardProps {
  collection: DemoHomeCollection;
  userLat?: number;
  userLng?: number;
  onStatusChange: (id: string, next: HomeCollectionStatus) => void;
  transitioning: boolean;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  userLat,
  userLng,
  onStatusChange,
  transitioning,
}) => {
  const [buttonFading, setButtonFading] = useState(false);
  const nextStatus = getNextStatus(collection.status);
  const actionLabel = getActionLabel(collection.status);
  const timeDisplay = formatPremiumTimeDisplay(collection.slot);

  // Distance calculation
  let distanceText: string | null = null;
  if (
    userLat !== undefined &&
    userLng !== undefined &&
    collection.lat !== undefined &&
    collection.lng !== undefined
  ) {
    const dist = haversineDistance(userLat, userLng, collection.lat, collection.lng);
    distanceText = `📍 ${dist.toFixed(1)} km away`;
  }

  const handleAction = useCallback(() => {
    if (!nextStatus) return;
    setButtonFading(true);
    setTimeout(() => {
      onStatusChange(collection.id, nextStatus);
      setButtonFading(false);
    }, 220);
  }, [nextStatus, collection.id, onStatusChange]);

  const handleNavigate = () => {
    const url = buildMapsUrl(collection.lat, collection.lng, collection.address);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3"
      style={{
        transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
        transform: transitioning ? 'scale(1.02)' : 'scale(1)',
        boxShadow: transitioning
          ? '0 8px 24px rgba(0,0,0,0.10)'
          : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm leading-tight">
              {collection.patientName}
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3" />
              {collection.phone}
            </p>
          </div>
        </div>
        <StatusBadge status={collection.status} />
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mb-1">
        <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-600 leading-snug">{collection.address}</p>
      </div>

      {/* Distance indicator */}
      {distanceText && (
        <p className="text-xs text-blue-500 font-medium ml-5 mb-2">{distanceText}</p>
      )}

      {/* Tests */}
      <div className="flex items-start gap-2 mb-3">
        <TestTube className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-500">{collection.tests.join(', ')}</p>
      </div>

      {/* Premium time display */}
      <div className="flex items-start gap-2 mb-4">
        <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium text-gray-700">{timeDisplay.line1}</p>
          <p className="text-xs text-gray-400">{timeDisplay.line2}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        {/* Navigate button — always visible */}
        <button
          onClick={handleNavigate}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          Navigate
        </button>

        {/* Status action button */}
        {actionLabel && nextStatus && (
          <button
            onClick={handleAction}
            disabled={buttonFading}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)',
              opacity: buttonFading ? 0 : 1,
              transition: 'opacity 0.22s ease-in-out',
            }}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {actionLabel}
          </button>
        )}

        {collection.status === 'COMPLETED' && (
          <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const HomeCollectionQueuePage: React.FC<HomeCollectionQueuePageProps> = ({
  isDemoMode = false,
}) => {
  // Seed once on module load (idempotent)
  seedDemoHomeCollections();

  const [collections, setCollections] = useState<DemoHomeCollection[]>(() =>
    getDemoHomeCollections()
  );
  const [transitioningId, setTransitioningId] = useState<string | null>(null);
  const [userLat, setUserLat] = useState<number | undefined>(undefined);
  const [userLng, setUserLng] = useState<number | undefined>(undefined);

  // Request GPS once on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
      },
      () => {
        // GPS denied or unavailable — silently hide distance
      },
      { timeout: 8000, maximumAge: 60_000 }
    );
  }, []);

  // Keep local state in sync with module-level store when navigating back
  useEffect(() => {
    setCollections(getDemoHomeCollections());
  }, []);

  const handleStatusChange = useCallback(
    (id: string, next: HomeCollectionStatus) => {
      setTransitioningId(id);
      updateDemoHomeCollectionStatus(id, next);
      setCollections([...getDemoHomeCollections()]);
      setTimeout(() => setTransitioningId(null), 300);
    },
    []
  );

  const pending = collections.filter((c) => c.status !== 'COMPLETED');
  const done = collections.filter((c) => c.status === 'COMPLETED');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <h1 className="text-base font-bold text-gray-800">Home Collections</h1>
            <p className="text-xs text-gray-400">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Daily Overview */}
        <DailyOverviewCard collections={collections} />

        {/* Pending tasks */}
        {pending.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Pending ({pending.length})
            </h3>
            {pending.map((c) => (
              <CollectionCard
                key={c.id}
                collection={c}
                userLat={userLat}
                userLng={userLng}
                onStatusChange={handleStatusChange}
                transitioning={transitioningId === c.id}
              />
            ))}
          </div>
        )}

        {/* Completed tasks */}
        {done.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Completed ({done.length})
            </h3>
            {done.map((c) => (
              <CollectionCard
                key={c.id}
                collection={c}
                userLat={userLat}
                userLng={userLng}
                onStatusChange={handleStatusChange}
                transitioning={transitioningId === c.id}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {collections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-blue-300" />
            </div>
            <p className="text-gray-500 font-medium">No home collections today</p>
            <p className="text-gray-400 text-sm mt-1">
              New assignments will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCollectionQueuePage;
