import { Splide } from '@splidejs/splide';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const news = (slider: HTMLElement) => {
  console.log('news');

  const component = new Splide(slider, {
    type: 'loop',
    perPage: 3,
    perMove: 1,
  }).mount();
};
