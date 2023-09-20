import { footer } from './footer';
import { groups } from './groups';
import { mouse } from './mouse';
import { nav } from './nav';
import { scramble } from './utils/scramble';
import { scrambleAppart } from './utils/scrambleAppart';
import { scrambleOpenAI } from './utils/scrambleOpenAI';

export const animations = () => {
  // setTimeout(groups, 1000);
  // mouse();
  // nav();
  groups();
  // scrambleOpenAI();
  // scrambleAppart();
  scramble();
  footer();
};
