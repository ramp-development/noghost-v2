import gsap from 'gsap';

export const home = () => {
  const loaderDuration = 8;
  const counter = {
    value: 0,
  };

  if (sessionStorage.getItem('visited') !== null) {
    $('.loader-wrapper').remove();
    return;
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

  tl.to('.loader_component', {
    opacity: 1,
    duration: 0.1,
  });

  tl.to(
    counter,
    {
      value: 100,
      onUpdate: updateLoaderText,
      duration: loaderDuration,
      ease: 'easeInOut',
    },
    0
  );

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
