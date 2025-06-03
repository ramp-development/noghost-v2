import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { queryElements } from '$utils/queryElements';

import { getRandomColor } from './utils/getRandomColor';

export const scramble = () => {
  console.log('scramble');

  /**
   * Triggers:
   * - hover
   * - scroll into view
   * - slide in view
   */

  const elements = queryElements<HTMLElement>('[data-scramble]');

  // for each onHover element
  elements.forEach((element) => {
    // get the text content
    const text = element.textContent;
    if (!text) return;

    // set a minimum width to avoid jumping
    element.style.minWidth = `${element.offsetWidth}px`;

    // create a timeline for the element
    const elementTimeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        elementTimeline.seek(0);
        elementTimeline.pause();
      },
    });

    // split the text into words and characters
    const splitElement = new SplitText(element, {
      type: 'words, chars',
      wordsClass: 'word',
      charsClass: 'char',
    });

    // for each character
    splitElement.chars.forEach((char: Element) => {
      if (!char.textContent) return;

      // create a timeline
      const charTimeline = gsap.to(char, {
        duration: 0.5,
        onStart: () => {
          char.classList.add('noghost');
          (char as HTMLElement).style.color = getRandomColor();
        },
        onComplete: () => {
          char.classList.remove('noghost');
          (char as HTMLElement).style.removeProperty('color');
        },
      });

      // add the timeline to the element timeline
      elementTimeline.add(charTimeline, Math.random());
    });

    // get the jQuery element
    const $element = $(element);

    switch (element.dataset.scramble) {
      case 'hover':
        // play the animation on hover
        element.addEventListener('mouseenter', () => {
          if (elementTimeline.isActive()) return;
          elementTimeline.play();
        });
        break;
      case 'scroll':
        // play the animation on scroll into view
        gsap.timeline({
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
          },
          onStart: () => {
            elementTimeline.play();
          },
        });
        break;
      case 'slide':
        // play the animation on slide into view
        // get the slide the element sits within
        const $slide = $($element).closest('.w-slide');

        // get the slide element and cancel if it does not exist
        const slideDOM = $slide[0];
        if (!slideDOM) return;

        // watch for changes to the styles set on the slide
        const slideObserver = new MutationObserver((mutationsList, observer) => {
          const style = window.getComputedStyle(element);
          const visibility = style.getPropertyValue('visibility');
          if (visibility === 'visible') elementTimeline.play();
        });

        // Start observing the target element with the configured parameters.
        slideObserver.observe(slideDOM, { attributes: true, attributeFilter: ['style'] });
        break;
      case 'accordion':
        // play the animation on slide into view
        // get the accordion the element sits within
        const $accordion = $($element).closest('.accordion_body');

        // get the slide element and cancel if it does not exist
        const accordionDOM = $accordion[0];
        if (!accordionDOM) return;

        // watch for changes to the styles set on the slide
        const accordionObserver = new MutationObserver((mutationsList, observer) => {
          const { height } = accordionDOM.style;
          if (height === '0px') elementTimeline.play();
          ScrollTrigger.refresh();
        });

        // Start observing the target element with the configured parameters.
        accordionObserver.observe(accordionDOM, { attributes: true, attributeFilter: ['style'] });
        break;
    }
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};
