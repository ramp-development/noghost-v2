import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const scale = () => {
  const prefix = '.section-panel_';
  const components = queryElements<HTMLDivElement>(`${prefix}wrapper`);

  components.forEach((component) => {
    const item = queryElement<HTMLDivElement>(`${prefix}scale`, component);
    if (!item) return;

    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.in',
      },
      scrollTrigger: {
        trigger: component,
        start: 'top bottom',
        end: 'top 25%',
        scrub: true,
        markers: true,
      },
    });

    timeline.from(item, { translateY: 128, duration: 1 });
    timeline.from(item, { scale: 0.9, duration: 0.5 }, '<0.5');
    // timeline.to(item, { '--border-radius--xlarge': 0 }, '<');
  });
};
