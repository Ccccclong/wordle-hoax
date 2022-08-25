import { createInterface, Interface as SystemInterface } from 'readline';
import { Game } from './game';

export class ConsoleApplication {
  private readonly systemInterface: SystemInterface;

  constructor(private readonly game: Game) {
    this.systemInterface = createInterface(process.stdin, process.stdout);
  }

  run() {
    this.promptForWord();
  }

  private promptForWord() {
    this.systemInterface.question('Guess a word: ', (input) => {
      const output = this.game.guess(input);
      console.log(output);
      if (this.game.isCompleted()) process.exit();
      else this.promptForWord();
    });
  }
}
