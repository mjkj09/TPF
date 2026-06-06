import { Search } from 'lucide-react';
import { inputClass } from '../styles/tokens';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const sizeConfig = {
  sm: {
    icon: 'w-4 h-4',
    iconLeft: 'left-3',
    input: 'pl-10 pr-4 py-2 text-sm',
  },
  md: {
    icon: 'w-5 h-5',
    iconLeft: 'left-4',
    input: 'pl-12 pr-4 py-3',
  },
} as const;

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Szukaj zestawów...',
  size = 'sm',
  className = 'max-w-3xl',
}: SearchBarProps) {
  const config = sizeConfig[size];

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <Search
        className={`absolute ${config.iconLeft} top-1/2 -translate-y-1/2 text-gray-400 ${config.icon}`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} ${config.input}`}
      />
    </form>
  );
}
