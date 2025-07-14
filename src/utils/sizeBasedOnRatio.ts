export const sizeBasedOnRatio = (element: HTMLElement, ratioFraction: number): void => {
  console.log('sizeBasedOnRatio');
  const { parentElement } = element;
  if (!parentElement) return;

  const { offsetWidth, offsetHeight } = parentElement;

  if (offsetWidth / offsetHeight <= ratioFraction) {
    element.style.width = '100%';
    element.style.height = 'auto';
  } else {
    element.style.width = 'auto';
    element.style.height = '100%';
  }
};
