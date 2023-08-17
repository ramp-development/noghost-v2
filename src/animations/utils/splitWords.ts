import { SplitText } from 'gsap/SplitText';

export const splitWords = (element: Element | Element[], timeline: GSAPTimeline, delay: string) => {
  const formatted = new SplitText(element, { type: 'lines, words' });
  formatted.lines.forEach((line) => line.classList.add('u-overflow-hidden'));

  timeline.from(
    formatted.words,
    {
      opacity: 0,
      translateY: '100%',
      stagger: 0.2,
    },
    delay
  );
};
