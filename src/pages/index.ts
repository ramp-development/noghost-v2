import { about } from './about';
import { home } from './home';
import { work } from './work';
import { workTemplate } from './workTemplate';

export const pages = () => {
  console.log('pages');
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
    case '/work':
      work();
      break;
    case '/about':
      about();
      break;
    default:
      if (pathname.includes('/work/')) {
        workTemplate();
      }
      break;
  }
};
