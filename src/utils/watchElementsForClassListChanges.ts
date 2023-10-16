export const watchElementsForClassListChanges = (
  elements: Element[],
  callback: (mutations: MutationRecord[]) => void
) => {
  // Create an observer instance
  const observer = new MutationObserver(callback);

  // Configuration of the observer
  const config: MutationObserverInit = { attributes: true, attributeFilter: ['class'] };

  // Pass each element to be observed
  elements.forEach((element) => {
    observer.observe(element, config);
  });

  // Return the observer in case you want to disconnect it later
  return observer;
};
