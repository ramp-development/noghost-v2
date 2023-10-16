import { about } from './about';

export const pages = () => {
  console.log('pages');
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      break;
    case '/work':
      break;
    case '/about':
      about();
      break;
    case '/contact':
      break;
  }
};
