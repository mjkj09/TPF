import { Link } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-red-500 rounded"></div>
            <div className="w-12 h-12 bg-yellow-400 rounded"></div>
            <div className="w-12 h-12 bg-blue-500 rounded"></div>
          </div>
        </div>
        <h1 className="text-6xl text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Nie znaleziono strony</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
}
