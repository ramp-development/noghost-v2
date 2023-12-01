import { queryElement } from './queryElement';

export const resizeHero = () => {
  const attr = 'data-component';
  const banner = queryElement<HTMLDivElement>(`[${attr}="banner"]`);
  const nav = queryElement<HTMLDivElement>(`[${attr}="nav"]`);
  const hero = queryElement<HTMLDivElement>(`[${attr}="hero"]`);

  if (!hero) return;

  let offsetHeight = 0;
  if (banner) offsetHeight += banner.offsetHeight;
  if (nav) offsetHeight += nav.offsetHeight;

  hero.style.minHeight = `calc(100svh - ${offsetHeight}px)`;
  hero.style.paddingBottom = `${offsetHeight}px`;
};
