import React, { useState } from 'react';
import { AlertTriangle, Eye, Filter, Calendar } from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import StatusBadge from '../../components/shared/StatusBadge';
import { useGetAllIncidents } from '../../hooks/useQueries';
import { formatDateTime } from '../../utils/formatters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Variant_low_high_medium } from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';

export default function IncidentsPage() {
  const { data: incidents = [], isLoading } = useGetAllIncidents();
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filtered = incidents
    .filter((i) => severityFilter === 'all' || i.severity === severityFilter)
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-green-200 bg-green-50';
    }
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Incident Reports</h1>
          <p className="text-sm text-muted-foreground">{incidents.length} total incidents</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-40 rounded-xl">
            <SelectValue placeholder="Filter severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value={Variant_low_high_medium.low}>Low</SelectItem>
            <SelectItem value={Variant_low_high_medium.medium}>Medium</SelectItem>
            <SelectItem value={Variant_low_high_medium.high}>High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <MedicalCard className="text-center py-12">
          <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No incidents found</p>
        </MedicalCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((incident) => (
            <MedicalCard
              key={incident.id}
              className={`border ${getSeverityColor(incident.severity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      incident.severity === 'high'
                        ? 'bg-red-100'
                        : incident.severity === 'medium'
                        ? 'bg-yellow-100'
                        : 'bg-green-100'
                    }`}
                  >
                    <AlertTriangle
                      className={`w-4 h-4 ${
                        incident.severity === 'high'
                          ? 'text-red-600'
                          : incident.severity === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Incident ID</p>
                    <p className="text-xs font-mono font-semibold">{incident.id.slice(0, 12)}...</p>
                  </div>
                </div>
                <StatusBadge status={incident.severity as any} />
              </div>

              <p className="text-sm text-foreground mb-2 line-clamp-3">{incident.description}</p>

              {incident.photo && (
                <div className="mb-2">
                  <img
                    src={incident.photo.getDirectURL()}
                    alt="Incident photo"
                    className="w-full h-32 object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{formatDateTime(incident.timestamp)}</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                Reporter: {incident.reporter.toString().slice(0, 16)}...
              </p>
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
