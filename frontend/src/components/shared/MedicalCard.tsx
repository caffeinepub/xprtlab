import React from 'react';
import { cn } from '@/lib/utils';

interface MedicalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function MedicalCard({ children, className, onClick, hoverable }: MedicalCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'card-medical p-4',
        hoverable && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all',
        className
      )}
    >
      {children}
    </div>
  );
}
