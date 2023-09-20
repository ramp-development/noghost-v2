import Splide from '@splidejs/splide';

import { queryElement } from '$utils/queryElement';

export const slider = () => {
  console.log('slider');
  const component = queryElement('.splide.cc-careers');
  if (!component) return;

  const slider = new Splide(component, {
    arrowPath:
      'M29.1639 20.7231C29.5633 20.3237 29.5633 19.6763 29.1639 19.2769L22.6561 12.7691C22.2567 12.3697 21.6093 12.3697 21.2099 12.7691C20.8106 13.1684 20.8106 13.8159 21.2099 14.2153L26.9946 20L21.2099 25.7847C20.8106 26.1841 20.8106 26.8316 21.2099 27.2309C21.6093 27.6303 22.2567 27.6303 22.6561 27.2309L29.1639 20.7231ZM10.7969 21.0226H28.4408V18.9774H10.7969V21.0226Z',
    pagination: false,
    gap: '1.25rem',
    autoWidth: true,
    classes: {
      // arrows: 'splide__arrows cc-arrow',
      arrow: 'splide__arrow cc-arrow',
      prev: 'splide__arrow--prev cc-prev',
      // next: 'splide__arrow--next cc-careers__arrow--next',
    },
  }).mount();
};
