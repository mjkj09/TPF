import { ReactNode } from 'react';
import { cn } from './ui/utils';
import { pageContainer } from '../styles/tokens';

interface PageHeaderProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function PageHeader({ children, className, innerClassName }: PageHeaderProps) {
  return (
    <div className={cn('bg-white border-b', className)}>
      <div className={cn(pageContainer, 'py-4', innerClassName)}>{children}</div>
    </div>
  );
}
