import type { Splide } from '@splidejs/splide';

export const splideMedia = (mediaQueryString: string, slider: Splide) => {
  const mediaQuery = window.matchMedia(mediaQueryString);
  if (mediaQuery.matches) slider.mount();
  mediaQuery.addEventListener('change', handleBreakpointChange);

  function handleBreakpointChange(event: MediaQueryListEvent) {
    if (event.matches) {
      slider.mount();
    } else {
      slider.destroy();
    }
  }
};
