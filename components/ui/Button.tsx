import React from 'react';
import clsx from 'clsx';

const buttonVariants = (variant?: string, size?: string) => {
  const variants: Record<string, string> = {
    primary:
      'bg-gold text-dark hover:bg-gold-light active:scale-95 font-semibold',
    secondary:
      'bg-dark-4 text-gold border border-gold hover:bg-dark-3 active:scale-95',
    outline:
      'border border-light text-light hover:bg-dark-3 active:scale-95',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
    ghost: 'text-light hover:bg-dark-3 active:scale-95',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return `inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant || 'primary']} ${sizes[size || 'md']}`;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(buttonVariants(variant, size), className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants };
