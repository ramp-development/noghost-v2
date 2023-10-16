import { about } from './about';
import { work } from './work';

export const pages = () => {
  console.log('pages');
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      break;
    case '/work':
      work();
      break;
    case '/about':
      about();
      break;
    case '/contact':
      break;
  }
};
