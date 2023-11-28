import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElements } from '$utils/queryElements';

export const scramble = () => {
  console.log('scramble');

  const elements = queryElements<HTMLHeadingElement>('[data-scramble]');
  if (!elements.length) return;

  elements.forEach((element) => {
    if (!element.textContent) return;

    gsap.to(element, {
      duration: 1.5,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
      scrambleText: {
        text: element.textContent,
        chars: 'abcdefghijklmnopqstuvwxyz          ',
        speed: 0.1,
        revealDelay: 0.5,
        // delimiter: ' ',
        oldClass: 'noghost',
      },
    });
  });
};
