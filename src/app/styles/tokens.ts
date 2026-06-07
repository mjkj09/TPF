export const pageShell = 'min-h-[calc(100vh-64px)] bg-gray-50';

export const pageContainer = 'max-w-7xl mx-auto px-4';

export const pageContainerNarrow = 'max-w-5xl mx-auto px-4';

export const cardClass = 'bg-white rounded-lg shadow-sm border border-gray-200';

export const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500';

export const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

export const btnPrimary = `${btnBase} bg-blue-500 hover:bg-blue-600 text-white`;

export const btnPrimaryFull = `${btnPrimary} w-full py-2`;

export const btnSecondary = `${btnBase} bg-gray-100 hover:bg-gray-200 text-gray-700`;

export const btnOutline = `${btnBase} border border-gray-300 text-gray-700 hover:bg-gray-50`;

export const btnGhost = `${btnBase} text-gray-700 hover:bg-gray-100`;

export const btnDanger = `${btnBase} bg-red-500 hover:bg-red-600 text-white`;

export const btnSuccess = `${btnBase} bg-green-500 hover:bg-green-600 text-white`;

export const btnWarning = `${btnBase} bg-yellow-500 hover:bg-yellow-600 text-white`;

export const btnDark = `${btnBase} bg-gray-900 hover:bg-gray-800 text-white`;

export const btnLink = 'text-blue-600 hover:text-blue-700 text-sm transition-colors';

export const btnPill =
  'px-6 py-2 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full whitespace-nowrap transition-colors text-gray-700';

export const btnChip =
  'px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors text-gray-700';

export const tabTriggerClass =
  'px-6 py-2 rounded-md text-sm text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors';

export function navLinkClass(isActive: boolean): string {
  return `px-4 py-2 rounded-lg transition-colors ${
    isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
  }`;
}

export function navLinkClassMobile(isActive: boolean): string {
  return `px-4 py-3 rounded-lg transition-colors text-left ${
    isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
  }`;
}
