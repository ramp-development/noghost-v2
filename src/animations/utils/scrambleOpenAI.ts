import { queryElement } from '$utils/queryElement';

export const scrambleOpenAI = () => {
  console.log('chatScramble');
  const textElement = queryElement<HTMLHeadingElement>('[data-flicker="text"]');
  if (!textElement) return;
  scrambleText(textElement);
};

function scrambleText(element: HTMLElement) {
  const originalText = element.innerText;
  element.innerHTML = '';

  // Wrap each letter in a span with class "NoGhost"
  for (const char of originalText) {
    const span = document.createElement('span');
    span.className = 'NoGhost';
    span.innerText = char;
    element.appendChild(span);
  }

  // Scramble each letter
  const scrambleInterval = setInterval(() => {
    const children = Array.from(element.children) as HTMLElement[];
    for (const child of children) {
      if (Math.random() < 0.5) {
        const randomChar = String.fromCharCode(33 + Math.floor(Math.random() * 90));
        child.innerText = randomChar;
      }
    }
  }, 50);

  // Stop scrambling after a certain time and return to original text
  setTimeout(() => {
    clearInterval(scrambleInterval);
    const children = Array.from(element.children) as HTMLElement[];
    children.forEach((child, index) => {
      child.innerText = originalText[index];
      child.removeAttribute('class');
    });
  }, 2000); // Unscramble after 2 seconds
}
