import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import { getRandomColor } from './getRandomColor';

export const flicker = (characters: HTMLDivElement[]) => {
  const codeLetterWrapper = queryElement<HTMLDivElement>('.code-letters');
  if (!codeLetterWrapper) return;

  const codeLetters = queryElements<HTMLDivElement>('.code-letter', codeLetterWrapper);

  const codeLetterWraper = queryElement<HTMLDivElement>('.code-letter-wrapper');
  if (!codeLetterWraper) return;

  characters.forEach((character: Element) => {
    let append;
    character.style.position = 'relative';

    character.addEventListener('mouseenter', () => {
      const codeLetter = codeLetters
        .find((codeLetter) => codeLetter.dataset.letter === character.textContent?.toLowerCase())
        ?.cloneNode(true);

      if (!codeLetter) return;

      const paths = queryElements('path', codeLetter);
      paths.forEach((path) => {
        path.style.fill = getRandomColor();
      });

      character.style.color = 'transparent';
      character.style.zIndex = '2';
      codeLetter.style.position = 'absolute';
      // codeLetter.style.top = '0';
      // codeLetter.style.left = '0';
      // codeLetter.style.transform = 'translate(-50%, -50%)';
      codeLetter.style.color = 'black';

      append = codeLetterWraper.cloneNode();
      append.appendChild(codeLetter);

      character.appendChild(append);
    });

    character.addEventListener('mouseleave', () => {
      if (!append) return;
      character.style.removeProperty('color');
      character.style.removeProperty('z-index');
      append.remove();
    });
  });
};
