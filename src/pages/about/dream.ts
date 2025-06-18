import gsap from 'gsap';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const dream = () => {
  console.log('dream');

  const attr = 'data-dream';
  const component = queryElement(`[${attr}="component"]`);
  if (!component) return;

  const numberOfItemsToAnimate = 5;
  const items = queryElements(`[${attr}="item"]`);
  const itemsToAnimate = items.slice(0, numberOfItemsToAnimate);
  let words = items.map((item) => item.firstChild?.textContent).filter(Boolean);
  words = shuffleArray(words);

  function shuffleArray(array: any[]) {
    const arr = array.slice(); // make a copy to avoid mutating the original
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function moveXItemsToEnd<T>(arr: T[], x: number): T[] {
    if (arr.length <= x) return arr.slice();
    return arr.slice(x).concat(arr.slice(0, x));
  }

  function prepItems() {
    words = moveXItemsToEnd(words, numberOfItemsToAnimate);
    itemsToAnimate.forEach((item, index) => {
      const nextChild = item.children[1];
      if (!nextChild) return;
      nextChild.textContent = words[index] || '';
    });
  }

  function animateItems() {
    const timeline = gsap.timeline({
      onComplete: () => {
        // After animation, update the first child and reset yPercent
        itemsToAnimate.forEach((item, index) => {
          const { children } = item;
          children[0].textContent = children[1].textContent;
        });

        prepItems();
        timeline.restart();
      },
    });

    timeline.to(
      itemsToAnimate.map((item) => item.children),
      {
        yPercent: -100,
        duration: 0.5,
        stagger: 0.05,
        delay: 1,
        ease: 'power2.inOut',
      }
    );
  }

  // Initial prep
  prepItems();
  animateItems();
};
