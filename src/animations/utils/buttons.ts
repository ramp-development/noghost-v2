export const buttons = (buttonGroup: Element, timeline: GSAPTimeline, delay: string) => {
  const buttonTexts = buttonGroup.querySelectorAll('.btn-text');

  timeline
    .from(
      buttonGroup.childNodes,
      {
        opacity: 0,
        translateX: '16',
        stagger: 0.2,
      },
      delay
    )
    .from(
      buttonTexts,
      {
        translateY: '100%',
        stagger: 0.1,
      },
      '<'
    );
};
