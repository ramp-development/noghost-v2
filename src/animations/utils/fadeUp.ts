export const fadeUp = (element: Element | Element[], timeline: GSAPTimeline, delay: string) => {
  timeline.from(element, { opacity: 0, yPercent: 10 }, delay);
};
