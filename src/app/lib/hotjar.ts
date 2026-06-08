import Hotjar from '@hotjar/browser';

let hotjarInitialized = false;

export function initHotjar(siteId: string | undefined) {
  if (!siteId || hotjarInitialized) {
    return;
  }

  hotjarInitialized = true;

  const numericId = Number(siteId);
  if (numericId) {
    Hotjar.init(numericId, 6);
  } else {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://t.contentsquare.net/uxa/${siteId}.js`;
    document.head.appendChild(script);
  }
}
