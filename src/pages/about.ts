import Splide from '@splidejs/splide';

import { queryElement } from '$utils/queryElement';

export const about = () => {
  console.log('about');
  const main = queryElement('.splide.cc-hwdi');
  const text = queryElement('.splide.cc-hwdi-text');
  if (!main || !text) return;

  const mainSlider = new Splide(main, {
    updateOnMove: true,
    arrows: false,
    pagination: false,
    breakpoints: {
      768: {
        gap: '1rem',
      },
    },
  });

  const textSlider = new Splide(text, {
    // type: 'fade',
    // arrows: false,
    pagination: false,
  });

  mainSlider.sync(textSlider);
  mainSlider.mount();
  textSlider.mount();
};
