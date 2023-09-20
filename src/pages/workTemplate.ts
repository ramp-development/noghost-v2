import { createElement } from '$utils/createElement';
import { queryElements } from '$utils/queryElements';

export const workTemplate = () => {
  const workDots = queryElements<HTMLDivElement>('[data-work-dots]');
  if (!workDots.length) return;

  workDots.forEach((dot) => {
    const id = dot.dataset.workDots;
    const workCards = queryElements<HTMLDivElement>(`[data-work-card=${id}]`);
    if (!workCards.length) return;

    workCards.forEach((workCard) => {
      workCard.appendChild(dot.cloneNode(true));
    });
  });

  createElement('script', document.head, {
    src: 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js',
    async: true,
  });
};
