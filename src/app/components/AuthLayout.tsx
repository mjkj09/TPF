import { ReactNode } from 'react';
import { LegoLogo } from './LegoLogo';
import { cardClass, pageShell } from '../styles/tokens';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className={`${pageShell} flex items-center justify-center px-4`}>
      <div className="max-w-md w-full">
        <div className={`${cardClass} p-8`}>
          <div className="flex justify-center mb-6">
            <LegoLogo />
          </div>

          <h1 className="text-2xl text-gray-900 text-center mb-2">{title}</h1>
          <p className="text-sm text-gray-600 text-center mb-6">{subtitle}</p>

          {children}

          <div className="mt-6 text-center">{footer}</div>
        </div>
      </div>
    </div>
  );
}
