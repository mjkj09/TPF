import { ReactNode } from 'react';
import { inputClass } from '../styles/tokens';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
}

export function FormField({ label, htmlFor, children, error }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export const inputClassName = inputClass;
