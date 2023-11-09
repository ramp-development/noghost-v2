export const launchConfetti = () => {
  const duration = 1 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 25,
      spread: 90,
      startVelocity: 80,
      origin: { x: 0, y: 0.75 },
      disableForReducedMotion: true,
      colors: [
        '#b8ff1d',
        '#97b7de',
        '#3695a3',
        '#ff5517',
        '#d9d9cd',
        '#818181',
        '#2a2a2a',
        '#ffffff',
        '#000000',
      ],
    });
    confetti({
      particleCount: 25,
      spread: 90,
      startVelocity: 80,
      origin: { x: 1, y: 0.75 },
      disableForReducedMotion: true,
      colors: [
        '#b8ff1d',
        '#97b7de',
        '#3695a3',
        '#ff5517',
        '#d9d9cd',
        '#818181',
        '#2a2a2a',
        '#ffffff',
        '#000000',
      ],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
