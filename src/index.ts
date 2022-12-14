import { ConsoleApplication } from './console.app';
import { Game } from './game';
import { provideWords } from './word.provider';

async function main() {
  try {
    const words = await provideWords();
    const game = new Game(words);
    const app = new ConsoleApplication(game);
    app.run();
  } catch (error) {
    console.error(error);
  }
}

main();
