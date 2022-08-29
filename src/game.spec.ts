import { Game } from './game';

describe(Game.name, () => {
  let words: string[];
  let game: Game;

  beforeEach(() => {
    words = [
      'HELLO',
      'WORLD',
      'QUITE',
      'FANCY',
      'FRESH',
      'PANIC',
      'CRAZY',
      'BUGGY',
      'HHLLL',
      'LLHLH',
      'HLHLH',
    ];
    game = new Game(words);
  });

  describe('#guess', () => {
    const describeCase = (
      name: string,
      inputs: string[],
      expectedOutputs: string[]
    ) =>
      describe(name, () => {
        it('returns output strings', () => {
          const outputs = inputs.map((input) => game.guess(input));
          expect(outputs).toEqual(expectedOutputs);
        });
      });

    describeCase(
      'when user input non-sense strings',
      [
        'SLACK',
        '12345678',
        '@#$%^&',
        'FFFFFFFFFFFFFFFFFFFFFFFFFFFFHHFFFFFFFFcbashFF34236847FFFFFFFFFFFFFFFFFFFF4743F',
        'KKKKK',
        '',
      ],
      [
        'Unknown word',
        'Unknown word',
        'Unknown word',
        'Unknown word',
        'Unknown word',
        'Unknown word',
      ]
    );

    describeCase(
      'when user can guess the word',
      ['HELLO', 'QUITE', 'PANIC', 'EMAIL', 'CRAZY'],
      ['_____', '_____', '_?__?', 'Unknown word', 'XXXXX in 4 rounds']
    );

    describeCase(
      'when user can guess the word in the last round',
      ['HELLO', 'QUITE', 'KKKKK', 'PANIC', 'WORLD', 'FANCY', 'CRAZY'],
      [
        '_____',
        '_____',
        'Unknown word',
        '_?__?',
        '__?__',
        '_?_?X',
        'XXXXX in 6 rounds',
      ]
    );

    describeCase(
      'when user cannot guess the word',
      ['HELLO', 'WORLD', 'FRESH', 'CRAZY', 'QUITE', 'FANCY'],
      [
        '_____',
        '_____',
        '_____',
        '?_?__',
        '__?__',
        '_XX?_\nThe correct word is PANIC',
      ]
    );

    describeCase(
      'when user input word with repeating characters - case 1',
      ['FANCY', 'PANIC', 'WORLD', 'HHLLL', 'HELLO', 'LLHLH'],
      ['_____', '_____', '___X_', '???X?', '?_?X_', 'XXXXX in 6 rounds']
    );

    describeCase(
      'when user input word with repeating characters - case 2',
      ['HELLO', 'FRESH', 'PANIC', 'BUGGY'],
      ['_____', '_____', '_____', 'XXXXX in 4 rounds']
    );
  });

  describe('#isCompleted', () => {
    const describeCase = (
      name: string,
      inputs: string[],
      expectedOutput: boolean
    ) => {
      describe(name, () => {
        it('returns whether the game is completed', () => {
          for (const input of inputs) game.guess(input);
          const output = game.isCompleted();
          expect(output).toEqual(expectedOutput);
        });
      });
    };

    describeCase('when the user inputs unknown words', ['SLACK'], false);

    describeCase(
      'when the user is still guessing',
      ['HELLO', 'QUITE', 'FANCY'],
      false
    );

    describeCase(
      'when the user guessed the correct word',
      ['HELLO', 'QUITE', 'PANIC', 'EMAIL', 'CRAZY'],
      true
    );

    describeCase(
      'when the user cannot guess in 6 rounds',
      ['HELLO', 'WORLD', 'FRESH', 'CRAZY', 'QUITE', 'FANCY'],
      true
    );
  });
});
