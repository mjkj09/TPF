import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { initGoogleAnalytics, trackPageView } from './lib/analytics';

export default function Root() {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  const getCurrentView = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/wishlist') return 'watchlist';
    if (location.pathname === '/search') return 'search';
    if (location.pathname === '/profile') return 'profile';
    if (location.pathname === '/login') return 'login';
    if (location.pathname === '/register') return 'register';
    if (location.pathname.startsWith('/product/')) return 'product';
    return 'home';
  };

  useEffect(() => {
    initGoogleAnalytics(measurementId);
  }, [measurementId]);

  useEffect(() => {
    trackPageView(measurementId, `${location.pathname}${location.search}`);
  }, [location.pathname, location.search, measurementId]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentView={getCurrentView()} />
        <Outlet />
      </div>
    </AuthProvider>
  );
}