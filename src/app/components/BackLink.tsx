import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';

interface BackLinkProps {
  to?: string;
  label?: string;
  className?: string;
}

export function BackLink({ to = '/', label = 'Powrót', className = '' }: BackLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 text-blue-600 hover:text-blue-700 ${className}`}
    >
      <ChevronLeft className="w-5 h-5" />
      {label}
    </Link>
  );
}
