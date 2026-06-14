import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'brand';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold',
        {
          'bg-navy text-cream': variant === 'default',
          'bg-green-700 text-white': variant === 'success',
          'bg-amber-600 text-white': variant === 'warning',
          'bg-red-600 text-white': variant === 'error',
          'bg-terracotta text-cream': variant === 'brand',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
