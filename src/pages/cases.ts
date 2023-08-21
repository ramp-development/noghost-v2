import { Splide } from '@splidejs/splide';

import { queryElement } from '$utils/queryElement';

export const cases = () => {
  console.log('cases');
  const component = queryElement<HTMLDivElement>('.splide.cc-cases');
  if (!component) return;

  const slider = new Splide(component, {
    arrows: false,
    pagination: false,
    wheel: true,
    autoWidth: true,
  });

  const mediaQuery = window.matchMedia('(min-width: 991px)');
  if (mediaQuery.matches) {
    slider.mount();
  }
  mediaQuery.addEventListener('change', handleBreakpointChange);

  // Function to handle breakpoint changes
  function handleBreakpointChange(event: MediaQueryListEvent) {
    if (event.matches) {
      slider.mount();
    } else {
      slider.destroy();
    }
  }
};
