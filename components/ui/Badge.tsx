import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  variant: 'neuf' | 'occasion' | 'promo' | 'vendu';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className }) => {
  const variantClasses = {
    neuf: 'bg-gold text-dark',
    occasion: 'bg-gray-600 text-light',
    promo: 'bg-red-600 text-white',
    vendu: 'bg-dark-4 text-gray-500',
  };

  return (
    <span
      className={clsx(
        'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
