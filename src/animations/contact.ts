import { queryElement } from '$utils/queryElement';

export const contact = () => {
  const component = queryElement('.contact-modal_popup');
  if (!component) return;

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName !== 'style') return;

      if (mutation.target.style.display === 'flex') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  });

  observer.observe(component, {
    attributes: true,
    childList: false,
    characterData: false,
  });
};
