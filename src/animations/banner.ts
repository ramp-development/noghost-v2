import { simulateEvent } from '@finsweet/ts-utils';

import { queryElement } from '$utils/queryElement';

export const banner = () => {
  console.log('banner');
  /**
   * get banner status from session storage
   * if banner is closed, do nothing
   * if banner is open, show banner
   */

  if (sessionStorage.getItem('bannerClosed') !== null) return;

  const trigger = queryElement('[data-banner="trigger"]');
  if (!trigger) return;

  simulateEvent(trigger, 'click');

  trigger.addEventListener('click', () => {
    sessionStorage.setItem('bannerClosed', 'true');
  });
};
