import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
}

export default function GradientButton({
  loading,
  children,
  size = 'md',
  variant = 'primary',
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-sm',
    lg: 'py-4 px-8 text-base',
  };

  if (variant === 'outline') {
    return (
      <button
        {...props}
        disabled={disabled || loading}
        className={cn(
          'rounded-xl font-semibold border-2 transition-all flex items-center justify-center gap-2',
          'border-brand-blue text-brand-blue hover:bg-gradient-primary-soft',
          sizeClasses[size],
          (disabled || loading) && 'opacity-60 cursor-not-allowed',
          className
        )}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'gradient-btn flex items-center justify-center gap-2',
        sizeClasses[size],
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
