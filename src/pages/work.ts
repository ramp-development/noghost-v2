import { queryElements } from '$utils/queryElements';

export const work = () => {
  console.log('work');

  const parents = queryElements<HTMLDivElement>('[data-tags-parent]');
  const children = queryElements<HTMLDivElement>('[data-tags-child]');

  parents.forEach((parent) => {
    const child = children.find((child) => child.dataset.tagsChild === parent.dataset.tagsParent);
    if (!child) return;

    parent.appendChild(child);
  });
};
