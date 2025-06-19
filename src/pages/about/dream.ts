import gsap from 'gsap';
import { createScrambleAnimation } from 'src/animations/scramble'; // adjust path as needed

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const dream = () => {
  console.log('dream');

  const attr = 'data-dream';
  const component = queryElement(`[${attr}="component"]`);
  if (!component) return;

  const numberOfItemsToAnimate = 10;
  const items = queryElements(`[${attr}="item"]`);
  const itemsToAnimate = items.slice(0, numberOfItemsToAnimate);
  let words = items.map((item) => item.firstChild?.textContent).filter(Boolean);
  words = shuffleArray(words);

  // Store scramble timelines for each item
  const scrambleTimelines: gsap.core.Timeline[] = [];

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
      const nextChild = item.children[1] as HTMLElement;
      if (!nextChild) return;

      // Clean up any previous SplitText wrappers
      nextChild.innerHTML = '';
      nextChild.textContent = words[index] || '';

      // Create a scramble animation for the next word, paused
      scrambleTimelines[index] = createScrambleAnimation(nextChild);
      scrambleTimelines[index].pause(0); // Ensure it's reset and paused
    });
  }

  // Main ticker loop with stagger
  function tickerLoop() {
    let completedCount = 0;
    const total = itemsToAnimate.length;
    const stagger = 0.05; // seconds

    itemsToAnimate.forEach((item, index) => {
      const nextChild = item.children[1] as HTMLElement;
      const scrambleTimeline = scrambleTimelines[index];
      if (!scrambleTimeline || !nextChild) {
        // Defensive: prep and try again
        prepItems();
        setTimeout(tickerLoop, 1000);
        return;
      }

      let slideDone = false;
      let scrambleDone = false;

      function checkDone() {
        if (slideDone && scrambleDone) {
          const { children } = item;
          children[0].textContent = children[1].textContent;
          gsap.set(children, { yPercent: 0 });
          completedCount += 1;
          if (completedCount === total) {
            prepItems();
            setTimeout(tickerLoop, 1000);
          }
        }
      }

      // Start both animations simultaneously, with staggered delay
      gsap.to(item.children, {
        yPercent: -100,
        duration: 0.35,
        delay: index * stagger,
        ease: 'power2.inOut',
        onComplete: () => {
          slideDone = true;
          checkDone();
        },
      });

      scrambleTimeline.eventCallback('onStart', null);
      scrambleTimeline.eventCallback('onComplete', () => {
        scrambleDone = true;
        checkDone();
      });
      // Start scramble with the same staggered delay
      setTimeout(() => {
        scrambleTimeline.play(0);
      }, index * stagger * 1000);
    });
  }

  // Initial prep
  prepItems();
  tickerLoop();
};
