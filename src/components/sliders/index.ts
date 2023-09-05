import { queryElements } from '$utils/queryElements';

import { news } from './news';
import { story } from './story';

export const sliders = () => {
  // get all sliders
  const sliders = queryElements('.splide');
  sliders.forEach((slider) => {
    const { classList } = slider;
    if (classList.contains('cc-news')) news(slider);
  });
};
