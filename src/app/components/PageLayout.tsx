import { ReactNode } from 'react';
import { cn } from './ui/utils';
import { pageContainer, pageContainerNarrow, pageShell } from '../styles/tokens';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  centered?: boolean;
  narrow?: boolean;
  padded?: boolean;
  bare?: boolean;
}

export function PageLayout({
  children,
  className,
  containerClassName,
  centered = false,
  narrow = false,
  padded = true,
  bare = false,
}: PageLayoutProps) {
  const container = narrow ? pageContainerNarrow : pageContainer;

  if (centered) {
    return (
      <div className={cn(pageShell, 'flex items-center justify-center px-4', className)}>
        {children}
      </div>
    );
  }

  if (bare) {
    return <div className={cn(pageShell, className)}>{children}</div>;
  }

  return (
    <div className={cn(pageShell, className)}>
      <div className={cn(container, padded && 'py-8', containerClassName)}>{children}</div>
    </div>
  );
}
