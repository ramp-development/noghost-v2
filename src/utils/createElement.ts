interface ElementOptions {
  class?: string;
  dataset?: Record<string, string>;
  text?: string;
  src?: string;
  callback?: () => void;
  [key: string]: any;
}

/**
 * Creates an element with given options and appends it to the desired location
 * @param type the type of element to create e.g. div, script, link
 * @param location where to append the element e.g. document.body
 * @param options options to add e.g. class, dataset, text, src
 * @returns The created element
 */
export const createElement = (
  type: string,
  location: HTMLElement,
  options: ElementOptions
): HTMLElement => {
  const element = document.createElement(type);

  Object.entries(options).forEach(([key, value]) => {
    if (key === 'class') {
      element.classList.add(value as string);
      return;
    }

    if (key === 'dataset') {
      Object.entries(value as Record<string, string>).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
      return;
    }

    if (key === 'text') {
      element.textContent = value as string;
      return;
    }

    if (key === 'callback') {
      element.onload = value as () => void;
      return;
    }

    element.setAttribute(key, value as string);
  });

  location.appendChild(element);
  return element;
};
