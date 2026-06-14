import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-cream border border-navy/20 text-navy rounded-lg px-4 py-2 text-sm',
          'placeholder:text-navy/40',
          'focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta',
          'transition-colors',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
