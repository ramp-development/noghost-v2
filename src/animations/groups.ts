import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import * as utils from './utils';
// import { browser } from './utils/broswer';

export const groups = () => {
  console.log('groups');
  const defaults = { duration: 1, ease: 'power2.out', stagger: 0.1 };
  const start = 'top 60%';
  const onload = (self: ScrollTriggerInstance) => self.progress === 1 && self.animation.progress(1);
  const onRefresh = (self: ScrollTriggerInstance) =>
    self.progress === 1 && self.animation.progress(1);

  const attr = 'data-animation-element';
  const groups = queryElements<HTMLDivElement>(`[${attr}="group"]`);
  // const logomarks = queryElements<HTMLDivElement>('[data-animation-element="logomark"]');
  // const titles = queryElements<HTMLHeadingElement>('[data-animation-element="title"]');
  // const paragraphs = queryElements<HTMLParagraphElement>('[data-animation-element="paragraph"]');
  // const cards = queryElements<HTMLDivElement>('[data-animation-element="card"]');
  // const buttonGroups = queryElements<HTMLDivElement>('[data-animation-element="button-group"]');
  // const lists = queryElements<HTMLOListElement | HTMLUListElement>(
  //   '[data-animation-element="list"]'
  // );

  // logomarks.forEach((logomark) => {
  //   const timeline = gsap.timeline({
  //     defaults,
  //     scrollTrigger: {
  //       trigger: logomark,
  //       start,
  //       onload,
  //       onRefresh,
  //     },
  //   });

  //   utils.slideUp(logomark.firstElementChild, timeline, '0');
  // });

  // titles.forEach((title) => {
  //   const timeline = gsap.timeline({
  //     defaults,
  //     scrollTrigger: {
  //       trigger: title,
  //       start,
  //       onload,
  //       onRefresh,
  //     },
  //   });

  //   utils.splitLines(title, timeline, '0');
  // });

  // paragraphs.forEach((paragraph) => {
  //   const timeline = gsap.timeline({
  //     defaults,
  //     scrollTrigger: {
  //       trigger: paragraph,
  //       start,
  //       onload,
  //       onRefresh,
  //     },
  //   });

  //   utils.splitLines(paragraph, timeline, '0.5');
  // });

  // cards.forEach((card) => {
  //   const timeline = gsap.timeline({
  //     defaults,
  //     scrollTrigger: {
  //       trigger: card,
  //       start,
  //       onload,
  //       onRefresh,
  //     },
  //   });

  //   utils.fadeUp(card, timeline, '0');
  // });

  // buttonGroups.forEach((buttonGroup) => {
  //   const timeline = gsap.timeline({
  //     defaults,
  //     scrollTrigger: {
  //       trigger: buttonGroup,
  //       start,
  //       onload,
  //       onRefresh,
  //     },
  //   });

  //   utils.buttons(buttonGroup, timeline, '1');
  // });

  // lists.forEach((list) => {
  //   const timeline = gsap.timeline({
  //     defaults,
  //     scrollTrigger: {
  //       trigger: list,
  //       start,
  //       onload,
  //       onRefresh,
  //     },
  //   });

  //   [...list.children].forEach((child, index) => {
  //     child.classList.add('u-overflow-hidden');
  //     utils.slideUp(child.firstElementChild, timeline, index === 0 ? '0' : '<0.1');
  //   });

  //   // utils.(list, timeline, '1');
  // });

  groups.forEach((group) => {
    // // get the trigger and cancel if custom
    // const trigger = group.dataset.animationTrigger;
    // if (trigger === 'custom') return;

    // reference to elements
    const logomark = queryElement<HTMLDivElement>(`[${attr}="logomark"]`, group);
    const title = queryElement<HTMLHeadingElement>(`[${attr}="title"]`, group);
    const paragraph = queryElement<HTMLParagraphElement>(`[${attr}="paragraph"]`, group);
    const cards = queryElements<HTMLDivElement>(`[${attr}="card"]`, group);
    const buttonGroup = queryElement<HTMLDivElement>(`[${attr}="button-group"]`, group);
    const list = queryElement<HTMLOListElement | HTMLUListElement>(`[${attr}="list"]`, group);

    const timeline = gsap.timeline({
      defaults,
      scrollTrigger: {
        trigger: group,
        start,
        onload,
        onRefresh,
        onEnter: () => {
          console.log('enter');
          console.log(group);
        },
      },
    });

    if (logomark) utils.slideUp(logomark.firstElementChild, timeline, '0');
    if (title) utils.splitLines(title, timeline, '0');
    if (paragraph) utils.splitLines(paragraph, timeline, '<0.25');
    if (cards) utils.fadeUp(cards, timeline, '<0.25');
    if (buttonGroup) utils.buttons(buttonGroup, timeline, '<0.25');
    if (list) {
      [...list.children].forEach((child, index) => {
        child.classList.add('u-overflow-hidden');
        utils.slideUp(child.firstElementChild, timeline, index === 0 ? '0' : '<0.1');
      });
    }

    // if (trigger) {
    //   const timeout = trigger === 'instant' ? 0 : parseFloat(trigger);
    //   setTimeout(() => {
    //     timeline.play();
    //   }, timeout);
    // }

    // document.addEventListener('refreshScrollTrigger', () => {
    //   timeline.scrollTrigger.refresh();
    // });
  });

  // const groups = [...document.querySelectorAll('[data-animation-element="group"]')];

  // const mm = gsap.matchMedia();
  // mm.add('(min-width: 768px)', () => {
  // });
};
