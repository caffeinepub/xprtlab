import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Bell, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { getRelativeTime } from '../../utils/formatters';

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
  const { notifications, markAllRead } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'alert': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-sm p-0">
        <SheetHeader className="gradient-primary px-4 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white font-bold flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </SheetTitle>
            {notifications.some(n => !n.read) && (
              <button
                onClick={markAllRead}
                className="text-white/80 text-xs hover:text-white"
              >
                Mark all read
              </button>
            )}
          </div>
        </SheetHeader>

        <div className="overflow-y-auto h-full pb-8">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Bell className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 flex gap-3 ${!n.read ? 'bg-gradient-primary-soft' : ''}`}
                >
                  <div className="mt-0.5 flex-shrink-0">{getIcon(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-semibold text-foreground' : 'text-foreground'}`}>
                      {n.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {getRelativeTime(n.timestamp)}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full gradient-primary mt-1.5 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
