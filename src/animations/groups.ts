import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import * as utils from './utils';

export const groups = () => {
  const defaults = { duration: 1, ease: 'power2.out', stagger: 0.1 };
  let start = 'top 60%';
  const onload = (self) => self.progress === 1 && self.animation.progress(1);
  const onRefresh = (self) => self.progress === 1 && self.animation.progress(1);

  const attr = 'data-animation-element';
  const groups = queryElements<HTMLDivElement>(`[${attr}="group"]`);

  groups.forEach((group) => {
    const trigger = group.dataset.animationTrigger;
    if (trigger) start = trigger;

    // reference to elements
    const title = queryElement<HTMLHeadingElement>(`[${attr}="title"]`, group);
    const buttonGroup = queryElement<HTMLDivElement>(`[${attr}="button-group"]`, group);

    const timeline = gsap.timeline({
      defaults,
      scrollTrigger: {
        trigger: group,
        start,
        onload,
        onRefresh,
      },
    });

    if (title) utils.splitLines(title, timeline, '0');
    if (buttonGroup) utils.buttons(buttonGroup, timeline, '-=50%');
  });

  // const mm = gsap.matchMedia();
  // mm.add('(min-width: 768px)', () => {
  // });
};
