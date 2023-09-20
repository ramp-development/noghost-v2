import { queryElement } from '$utils/queryElement';

import { getRandomColor } from './getRandomColor';

export const scramble = (): void => {
  console.log('scramble');
  const el = queryElement('[data-flicker="text"]');
  if (!el) return;

  const phrases = [
    'We are',
    'an award-wining',
    'immersive',
    'story studio',
    'We are an award-wining immersive story studio',
  ];
  const fx = new TextScramble(el);

  let counter = 0;
  const nextPhrase = async (): Promise<void> => {
    await fx.setText(phrases[counter]);
    if (counter === phrases.length - 1) return;
    setTimeout(nextPhrase, 800);
    counter = (counter + 1) % phrases.length;
  };

  nextPhrase();
};

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

class TextScramble {
  private element: HTMLElement; // The HTML element that holds the text
  private chars = 'abcdefghijklmnopqrstuvwxyz'; // The set of characters used for scrambling
  private queue: QueueItem[] = []; // Queue for storing text update information
  private frame = 0; // Frame counter
  private frameRequest?: number; // ID returned by requestAnimationFrame
  private resolve?: () => void; // Promise resolver

  // Constructor
  constructor(element: HTMLElement) {
    this.element = element;
    // Bind the update method to 'this' so it can be used as a callback
    this.update = this.update.bind(this);
  }

  // Method to set new text and initiate the scramble effect
  public async setText(newText: string): Promise<void> {
    const oldText = this.element.innerText; // The existing text in the element
    const maxLength = Math.max(oldText.length, newText.length);

    // Return a Promise to signify when the text has been fully scrambled and restored
    return new Promise<void>((resolve) => {
      this.resolve = resolve; // Store the resolve method for later use
      this.queue = []; // Reset the queue

      // Initialize the queue with text update information
      for (let i = 0; i < maxLength; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      // Cancel any existing animation
      cancelAnimationFrame(this.frameRequest as number);
      this.frame = 0;
      // Start the animation
      this.update();
    });
  }

  // The animation loop, called repeatedly to update each character
  private update(): void {
    console.log(this.frame);
    let output = '';
    let complete = 0;

    // Iterate over the queue to update each character
    for (let i = 0; i < this.queue.length; i++) {
      const { from, to, start, end, char } = this.queue[i];

      // Logic to determine the state of each character
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        const newChar = char || Math.random() < 0.27 ? this.randomChar() : char;
        this.queue[i].char = newChar;
        output += `<span class="noghost" style="color: ${getRandomColor()};">${newChar}</span>`;
      } else {
        output += from;
      }
    }

    // Update the HTML content
    this.element.innerHTML = output;

    // Check if the animation is complete
    if (complete === this.queue.length) {
      this.resolve?.(); // Resolve the promise
    } else {
      // Schedule the next update
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  // Method to get a random character for scrambling
  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const fps = 30;
let now;
let then = Date.now();
const interval = 1000 / fps;
let delta;

function draw() {
  requestAnimationFrame(draw);

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    // update time stuffs

    // Just `then = now` is not enough.
    // Lets say we set fps at 10 which means
    // each frame must take 100ms
    // Now frame executes in 16ms (60fps) so
    // the loop iterates 7 times (16*7 = 112ms) until
    // delta > interval === true
    // Eventually this lowers down the FPS as
    // 112*10 = 1120ms (NOT 1000ms).
    // So we have to get rid of that extra 12ms
    // by subtracting delta (112) % interval (100).
    // Hope that makes sense.

    then = now - (delta % interval);

    // ... Code for Drawing the Frame ...
  }
}
