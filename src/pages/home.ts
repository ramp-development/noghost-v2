import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

import { queryElement } from '$utils/queryElement';

export const home = () => {
  console.log('home');

  const customEase =
    'M0,0,C0.061,0.186,0.198,0.488,0.482,0.568,0.564,0.591,0.741,0.561,0.882,0.668,1.009,0.765,0.986,1,1,1';
  const counter = { value: 0 };
  let duration = 6;

  const attr = 'data-loader';
  const loaderText = queryElement<HTMLDivElement>(`[${attr}="text"]`);
  const loaderBackground = queryElement<HTMLDivElement>(`[${attr}="background"]`);
  const loaderClose = queryElement<HTMLDivElement>(`[${attr}="close"]`);

  if (!loaderText || !loaderBackground || !loaderClose) return;

  // If not a first time visit in this tab
  if (sessionStorage.getItem('visited') !== null) {
    duration = 0.1;
    counter.value = 50;
  }

  sessionStorage.setItem('visited', 'true');

  const updateLoaderText = () => {
    const progress = Math.round(counter.value);
    loaderText.textContent = `${progress}%`;
  };

  const endLoaderAnimation = () => {
    simulateEvent(loaderClose, 'click');
  };

  const timeline = gsap.timeline({
    defaults: {
      duration,
      ease: CustomEase.create('custom', customEase),
    },
    onComplete: endLoaderAnimation,
  });

  timeline
    .to(counter, {
      value: 100,
      onUpdate: updateLoaderText,
    })
    .to(
      loaderBackground,
      {
        width: '100%',
      },
      '<'
    );
};
