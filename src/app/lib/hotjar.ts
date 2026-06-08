import Hotjar from '@hotjar/browser';

let hotjarInitialized = false;

function contentsquareScriptLoaded(siteId: string) {
  return Boolean(
    document.querySelector(`script[src*="contentsquare.net/uxa/${siteId}"]`),
  );
}

export function initHotjar(siteId: string | undefined) {
  if (!siteId || hotjarInitialized) {
    return;
  }

  hotjarInitialized = true;

  const numericId = Number(siteId);
  if (numericId) {
    Hotjar.init(numericId, 6);
    return;
  }

  if (contentsquareScriptLoaded(siteId)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://t.contentsquare.net/uxa/${siteId}.js`;
  document.head.appendChild(script);
}
