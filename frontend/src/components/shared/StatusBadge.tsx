import React from 'react';
import { cn } from '@/lib/utils';

type StatusType =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'canceled'
  | 'requested'
  | 'assigned'
  | 'low'
  | 'medium'
  | 'high';

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'status-pending' },
  confirmed: { label: 'Confirmed', className: 'status-confirmed' },
  completed: { label: 'Completed', className: 'status-completed' },
  canceled: { label: 'Canceled', className: 'status-canceled' },
  requested: { label: 'Requested', className: 'status-pending' },
  assigned: { label: 'Assigned', className: 'status-confirmed' },
  low: { label: 'Low', className: 'severity-low' },
  medium: { label: 'Medium', className: 'severity-medium' },
  high: { label: 'High', className: 'severity-high' },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'status-pending' };
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-semibold',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
