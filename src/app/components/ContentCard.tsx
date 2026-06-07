import { HTMLAttributes, ReactNode } from 'react';
import { cn } from './ui/utils';
import { cardClass } from '../styles/tokens';

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ContentCard({ children, className, ...props }: ContentCardProps) {
  return (
    <div className={cn(cardClass, 'p-6', className)} {...props}>
      {children}
    </div>
  );
}
