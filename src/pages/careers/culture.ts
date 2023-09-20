import { queryElements } from '$utils/queryElements';

export const culture = () => {
  const elements = queryElements<HTMLElement>('[data-culture]');

  const setColors = (elements: HTMLElement[], color: string) => {
    elements.forEach((element) => {
      if (element.tagName === 'STRONG') {
        element.style.color = color;
      } else {
        element.style.backgroundColor = color;
      }
    });
  };

  const removeColors = (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      if (element.tagName === 'STRONG') {
        element.style.removeProperty('color');
      } else {
        element.style.removeProperty('background-color');
      }
    });
  };

  elements.forEach((element) => {
    const corresponding = elements.find(
      (el) => el !== element && el.dataset.culture === element.dataset.culture
    );
    if (!corresponding) return;

    element.addEventListener('mouseenter', () => {
      setColors([element, corresponding], `var(--${element.dataset.culture})`);
    });

    element.addEventListener('mouseleave', () => {
      removeColors([element, corresponding]);
    });
  });
};
