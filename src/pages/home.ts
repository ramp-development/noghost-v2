import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

export const home = () => {
  let loaderDuration = 8;
  let counter = {
    value: 0,
  };

  if (sessionStorage.getItem('visited') !== null) {
    $('.loader-wrapper').remove();
    return;
    loaderDuration = 2;
    counter = {
      value: 75,
    };
  }

  sessionStorage.setItem('visited', 'true');

  function updateLoaderText() {
    const progress = Math.round(counter.value);
    $('.loader_number').text(progress);
  }

  function endLoaderAnimation() {
    $('.loader_ix-trigger').click();
  }

  const tl = gsap.timeline({
    onComplete: endLoaderAnimation,
  });

  tl.to(counter, {
    value: 100,
    onUpdate: updateLoaderText,
    duration: loaderDuration,
    ease: 'easeInOut',
  });

  tl.to(
    '.loader_progress-bar',
    {
      width: '100%',
      duration: loaderDuration,
      ease: 'easeInOut',
    },
    0
  );
};
