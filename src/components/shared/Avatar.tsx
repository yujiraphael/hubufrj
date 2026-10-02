'use client';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-12 w-12 text-sm',
};

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-white/[0.07] font-semibold tracking-[-0.02em] text-foreground ring-1 ring-inset ring-white/10 ${className}`}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
