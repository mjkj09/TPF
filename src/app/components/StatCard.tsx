import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

export function StatCard({ label, value, valueClassName = 'text-gray-900' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className={`text-3xl ${valueClassName}`}>{value}</div>
    </div>
  );
}
