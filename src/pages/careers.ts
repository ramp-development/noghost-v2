import { simulateEvent } from '@finsweet/ts-utils';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const careers = () => {
  console.log('careers');

  const accordionLists = queryElements<HTMLDivElement>('.accordion_list');
  accordionLists.forEach((accordionList) => {
    const accordionHeader = queryElement<HTMLDivElement>('.accordion_header', accordionList);
    if (accordionHeader) simulateEvent(accordionHeader, 'click');
  });
};
