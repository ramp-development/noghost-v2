import { home } from './home';

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
  }
};
