import { queryElement } from '$utils/queryElement';

import { launchConfetti } from './utils/launchConfetti';

export const celebration = () => {
  console.log('celebration');

  const trigger = queryElement<HTMLDivElement>('[data-confetti="trigger"]');
  if (!trigger) return;

  trigger.addEventListener('click', () => {
    launchConfetti();
  });
};
