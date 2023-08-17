export const slideUp = (element: Element, timeline: GSAPTimeline, delay: string) => {
  timeline.from(element, { yPercent: 100 }, delay);
};
