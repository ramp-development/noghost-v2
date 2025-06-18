import { queryElement } from './queryElement';
import { queryElements } from './queryElements';

export const resizeHero = () => {
  const attr = 'data-component';
  const banner = queryElement<HTMLDivElement>(`[${attr}="banner"]`);
  const nav = queryElement<HTMLDivElement>(`[${attr}="nav"]`);
  const heros = queryElements<HTMLDivElement>(`[${attr}="hero"]`);

  if (heros.length === 0) return;

  for (const hero of heros) {
    let offsetHeight = 0;
    if (banner) offsetHeight += banner.offsetHeight;
    if (nav) offsetHeight += nav.offsetHeight;

    hero.style.minHeight = `calc(100svh - ${offsetHeight}px)`;
    hero.style.paddingBottom = `${offsetHeight}px`;
  }
};
