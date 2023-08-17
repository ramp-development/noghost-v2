import { SplitText } from 'gsap/SplitText';

export const splitLines = (element: Element | Element[], timeline: GSAPTimeline, delay: string) => {
  const formatted = new SplitText(element, {
    type: 'lines, words',
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
};
