import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { animations } from './animations';
import { pages } from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(Flip, ScrambleTextPlugin, ScrollTrigger, SplitText);

  animations();
  pages();
});
