const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
} as const;

interface LegoLogoProps {
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function LegoLogo({ size = 'sm', className = '' }: LegoLogoProps) {
  const brickClass = sizeClasses[size];

  return (
    <div className={`flex gap-1 ${className}`}>
      <div className={`${brickClass} bg-red-500 rounded`} />
      <div className={`${brickClass} bg-yellow-400 rounded`} />
      <div className={`${brickClass} bg-blue-500 rounded`} />
    </div>
  );
}
