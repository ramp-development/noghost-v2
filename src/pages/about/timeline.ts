import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';
import { watchElementsForClassListChanges } from '$utils/watchElementsForClassListChanges';

export const timeline = () => {
  console.log('timeline');

  const timeline = queryElement<HTMLDivElement>('.timeline_component');
  const anchors = queryElements<HTMLAnchorElement>('.timeline_anchor', timeline);
  const items = queryElements<HTMLDivElement>('.timeline_right-item', timeline);

  makeAllItemsInactive();
  const index = anchors.findIndex((anchor) => anchor.classList.contains('w--current'));
  if (index >= 0) {
    setActiveItem(index);
    moveAnchors(index);
  }

  watchElementsForClassListChanges(anchors, (mutations) => {
    mutations.forEach((mutation) => {
      const target = mutation.target as HTMLAnchorElement;
      if (!target.classList.contains('w--current')) return;

      makeAllItemsInactive();
      const index = anchors.indexOf(target);
      setActiveItem(index);

      moveAnchors(index);
    });
  });

  function makeAllItemsInactive() {
    items.forEach((item) => {
      item.classList.remove('is-active');
    });
  }

  function setActiveItem(index: number) {
    items[index].classList.add('is-active');
  }

  function moveAnchors(index: number) {
    anchors.forEach((anchor) => {
      anchor.style.transform = `translateY(-${index * 100}%)`;
    });
  }
};
