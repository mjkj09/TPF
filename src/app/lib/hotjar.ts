import Hotjar from '@hotjar/browser';

let initialized = false;

export function initHotjar(siteId: string | undefined) {
  if (!siteId || initialized) {
    return;
  }

  const id = Number(siteId);
  if (!id) {
    return;
  }

  initialized = true;
  Hotjar.init(id, 6);
}
