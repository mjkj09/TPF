import { useEffect } from 'react';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga4';

export function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}
