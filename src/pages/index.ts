import { about } from './about';
import { careers } from './careers';
import { home } from './home';
import { workTemplate } from './workTemplate';

export const pages = () => {
  const { pathname } = window.location;

  /**
   * - home
   * - work
   * - workTemplate
   * - about
   * - careers
   * - contact
   */

  switch (pathname) {
    case '/':
      home();
      break;
    case '/work':
      workTemplate();
      break;
    case '/about':
      about();
      break;
    case '/careers':
      careers();
      break;
  }
};
