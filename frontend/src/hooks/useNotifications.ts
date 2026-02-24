import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useAuth } from './useAuth';
import { AppRole } from '../backend';

export interface AppNotification {
  id: string;
  type: 'booking' | 'task' | 'report' | 'incident' | 'alert';
  message: string;
  timestamp: number;
  read: boolean;
  relatedId?: string;
}

// In-memory notification store (derived from backend data)
let notificationStore: AppNotification[] = [];
let lastChecked = 0;

export function useNotifications() {
  const { actor, isFetching } = useActor();
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery<AppNotification[]>({
    queryKey: ['notifications', userProfile?.appRole],
    queryFn: async (): Promise<AppNotification[]> => {
      if (!actor || !userProfile) return notificationStore;

      const now = Date.now();
      const newNotifs: AppNotification[] = [];

      try {
        if (userProfile.appRole === AppRole.patient) {
          const bookings = await actor.getMyBookings();
          bookings.forEach((b) => {
            const ts = Number(b.timestamp) / 1_000_000;
            if (ts > lastChecked && lastChecked > 0) {
              newNotifs.push({
                id: `booking-${b.id}-${b.status}`,
                type: 'booking',
                message: `Booking ${b.id.slice(0, 8)} status: ${b.status}`,
                timestamp: ts,
                read: false,
                relatedId: b.id,
              });
            }
          });
        } else if (userProfile.appRole === AppRole.phlebotomist) {
          const collections = await actor.getMyHomeCollectionRequests();
          collections.forEach((c) => {
            const ts = Number(c.timestamp) / 1_000_000;
            if (ts > lastChecked && lastChecked > 0) {
              newNotifs.push({
                id: `hc-${c.id}`,
                type: 'task',
                message: `New home collection request at ${c.address.slice(0, 30)}`,
                timestamp: ts,
                read: false,
                relatedId: c.id,
              });
            }
          });
        } else if (userProfile.appRole === AppRole.labAdmin || userProfile.appRole === AppRole.superAdmin) {
          const incidents = await actor.getAllIncidents();
          incidents.forEach((i) => {
            const ts = Number(i.timestamp) / 1_000_000;
            if (ts > lastChecked && lastChecked > 0) {
              newNotifs.push({
                id: `incident-${i.id}`,
                type: 'incident',
                message: `New ${i.severity} severity incident reported`,
                timestamp: ts,
                read: false,
                relatedId: i.id,
              });
            }
          });
        }
      } catch {
        // Silently fail for notification polling
      }

      if (newNotifs.length > 0) {
        notificationStore = [...newNotifs, ...notificationStore].slice(0, 50);
      }
      lastChecked = now;
      return notificationStore;
    },
    enabled: !!actor && !isFetching && !!userProfile,
    refetchInterval: 30_000,
  });

  const markAllRead = useCallback(() => {
    notificationStore = notificationStore.map((n) => ({ ...n, read: true }));
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, [queryClient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, markAllRead };
}
