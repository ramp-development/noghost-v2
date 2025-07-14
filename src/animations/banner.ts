import { simulateEvent } from '@finsweet/ts-utils';

import { queryElement } from '$utils/queryElement';
import { resizeHero } from '$utils/resizeHero';

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
    // setTimeout(() => {
    //   resizeHero();
    // }, 100);
  });

  // setTimeout(() => {
  //   resizeHero();
  // }, 100);
};
