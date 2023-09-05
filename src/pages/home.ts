import { gsap } from 'gsap';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const home = () => {
  console.log('home');

  const cardWrappers = queryElements('.home-wwd_card-wrapper');
  cardWrappers.forEach((cardWrapper) => {
    const card = queryElement<HTMLDivElement>('.home-wwd_card', cardWrapper);
    const hoverReveal = queryElement<HTMLDivElement>('.home-wwd_card-hover-reveal', cardWrapper);
    const hoverContent = queryElement<HTMLDivElement>('.home-wwd_card-hover-content', cardWrapper);
    const line = queryElement<HTMLDivElement>('.home-wwd_card-line', cardWrapper);
    const circleBtn = queryElement<HTMLDivElement>('.circle-btn', cardWrapper);
    const clickTriggers = queryElements<HTMLDivElement>('[data-wwd="click-trigger"]', cardWrapper);
    const cardWrapperWidth = cardWrapper.clientWidth;
    if (!card || !hoverReveal) return;

    // card.style.width = `${cardWrapper.clientWidth}px`;
    card.style.maxWidth = `${cardWrapper.clientWidth}px`;

    const cardWrapperHover = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: 'power2.out',
      },
    });

    cardWrapperHover
      .from(hoverReveal, { height: 0 })
      .from(line, { width: '0%' }, '<0.1')
      .from(circleBtn, { opacity: 0, xPercent: -100 }, '<')
      .from(hoverContent, { opacity: 0 }, '<0.1');

    const cardWrapperClick = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: 'power2.out',
      },
    });

    cardWrapper.addEventListener('mouseenter', () => {
      cardWrapperHover.timeScale(1).play();
    });

    clickTriggers.forEach((clickTrigger) => {
      clickTrigger.addEventListener('click', () => {
        cardWrapper.style.flex = '0 0 auto';
        gsap.to('.home-wwd_card', { color: 'transparent', opacity: 0 });
        gsap.to('.home-wwd_card-wrapper', { opacity: 0.5 });
        gsap.to(card, { color: 'black', opacity: 1 });
        gsap.to(cardWrapper, { width: `${cardWrapperWidth * 2}px`, opacity: 1 });
      });
    });

    cardWrapper.addEventListener('mouseleave', () => {
      cardWrapperHover.timeScale(2).reverse();
      // cardWrapper.style.removeProperty('flex');
      gsap.to('.home-wwd_card', { color: 'black', opacity: 1 });
      gsap.to('.home-wwd_card-wrapper', { opacity: 1 });
      gsap.to(cardWrapper, {
        width: cardWrapperWidth,
        onComplete: () => {
          cardWrapper.style.removeProperty('flex');
        },
      });
    });
  });
};
