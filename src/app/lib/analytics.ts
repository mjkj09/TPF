import ReactGA from 'react-ga4';

let initialized = false;

export function initGoogleAnalytics(measurementId: string | undefined) {
  if (!measurementId || initialized) {
    return;
  }

  initialized = true;
  ReactGA.initialize(measurementId);
}
