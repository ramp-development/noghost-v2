import { queryElement } from '$utils/queryElement';

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

export const scrambleAppart = (): void => {
  console.log('scrambleAppart');
  const el = queryElement('[data-flicker="text"]');
  if (!el) return;

  const phrases = ['We are an award-wining immersive story studio'];
  const fx = new TextScramble(el);

  let counter = 0;
  const nextPhrase = async (): Promise<void> => {
    await fx.setText(phrases[counter]);
    setTimeout(nextPhrase, 1200);
    counter = (counter + 1) % phrases.length;
  };

  nextPhrase();
};

class TextScramble {
  private el: HTMLElement;
  private chars = 'abcdefghijklmnopqrstuvwxyz';
  private queue: QueueItem[] = [];
  private frame = 0;
  private frameRequest?: number;
  private resolve?: () => void;

  constructor(el: HTMLElement) {
    this.el = el;
    this.update = this.update.bind(this);
  }

  public async setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const maxLength = Math.max(oldText.length, newText.length);

    return new Promise<void>((resolve) => {
      this.resolve = resolve;
      this.queue = [];

      for (let i = 0; i < maxLength; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 50);
        const end = start + Math.floor(Math.random() * 50);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest as number);
      this.frame = 0;
      this.update();
    });
  }

  private update(): void {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      const { from, to, start, end, char } = this.queue[i];

      const span = document.createElement('span');
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        const newChar = char || Math.random() < 0.28 ? this.randomChar() : char;
        this.queue[i].char = newChar;
        output += `<span class="noghost">${newChar}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve?.();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
