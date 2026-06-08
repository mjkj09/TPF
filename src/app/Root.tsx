import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import Header from './components/Header';
import { AnalyticsListener } from './components/AnalyticsListener';
import { AuthProvider } from './contexts/AuthContext';
import { initGoogleAnalytics } from './lib/analytics';
import { initHotjar } from './lib/hotjar';

export default function Root() {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const hotjarSiteId = import.meta.env.VITE_HOTJAR_SITE_ID;

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
    initHotjar(hotjarSiteId);
  }, [hotjarSiteId]);

  return (
    <AuthProvider>
      <AnalyticsListener />
      <div className="min-h-screen bg-gray-50">
        <Header currentView={getCurrentView()} />
        <Outlet />
        <Toaster position="bottom-right" richColors closeButton />
      </div>
    </AuthProvider>
  );
}
