export const onAllImagesLoaded = (callback: () => void): void => {
  window.onload = () => {
    const { images } = document;
    let loadedImagesCount = 0;

    const imageLoadHandler = () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) callback();
    };

    for (let i = 0; i < images.length; i++) {
      if (images[i].complete) {
        loadedImagesCount++;
      } else {
        images[i].addEventListener('load', imageLoadHandler);
        images[i].addEventListener('error', imageLoadHandler); // Handle broken images too
      }
    }

    // If all images are already loaded (e.g., from cache)
    if (loadedImagesCount === images.length) callback();
  };
};
