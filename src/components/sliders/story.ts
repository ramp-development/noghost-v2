import { Splide } from '@splidejs/splide';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const story = (slider: HTMLElement) => {
  console.log('story');
  const navList = queryElement('[data-splide-nav="list"]', slider);
  const navItem = queryElement('[data-splide-nav="item"]', slider)?.cloneNode(true);
  const numberOfSlides = queryElements('.splide__slide', slider).length;

  if (!navList || !navItem) return;

  // remove all nav items
  while (navList.firstChild) {
    navList.removeChild(navList.firstChild);
  }

  // append the correct number of nav items
  for (let i = 0; i < numberOfSlides; i++) {
    navList.appendChild(navItem.cloneNode(true));
  }

  const component = new Splide(slider, {});
};
