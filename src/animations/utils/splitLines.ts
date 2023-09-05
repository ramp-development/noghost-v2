import { SplitText } from 'gsap/SplitText';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import { getRandomColor } from './getRandomColor';

export const splitLines = (element: HTMLElement, timeline: GSAPTimeline, delay: string) => {
  const formatted = new SplitText(element, {
    type: 'lines, chars',
    linesClass: 'u-overflow-hidden',
  });

  formatted.lines.forEach((line, index) => {
    timeline.from(
      line.children,
      {
        translateY: '100%',
        stagger: 0,
      },
      index === 0 ? delay : '<0.2'
    );
  });

  const { flicker } = element.dataset;
  if (!flicker) return;
};
