import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';

export const footer = () => {
  console.log('footer');
  const component = queryElement<HTMLDivElement>('.footer');
  if (!component) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: component,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
    },
    // defaults: {
    //   duration: 1,
    //   ease: 'power4.out',
    // },
  });

  timeline.from(component, { yPercent: 10 });
};
