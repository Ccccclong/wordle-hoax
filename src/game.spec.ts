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
    ];
    game = new Game(words);
  });

  describe('#guess', () => {
    const cases = [
      [['SLACK'], ['Unknown word']],
      [
        ['HELLO', 'QUITE', 'PANIC', 'EMAIL', 'CRAZY'],
        ['_____', '_____', '_?__?', 'Unknown word', 'XXXXX in 5 rounds'],
      ],
      [
        ['HELLO', 'WORLD', 'FRESH', 'CRAZY', 'QUITE', 'FANCY'],
        [
          '_____',
          '_____',
          '_____',
          '?_?__',
          '__?__',
          '_XX?_\nThe correct word is PANIC',
        ],
      ],
      [
        ['KKKKK', 'KKKKK', 'KKKKK', 'KKKKK', 'KKKKK', 'KKKKK'],
        [
          'Unknown word',
          'Unknown word',
          'Unknown word',
          'Unknown word',
          'Unknown word',
          'Unknown word\nThe correct word is HELLO',
        ],
      ],
    ];

    describe.each(cases)('case %#', (inputs, expectedOutputs) => {
      it('returns output strings', () => {
        const outputs = inputs.map((input) => game.guess(input));
        expect(outputs).toEqual(expectedOutputs);
      });
    });
  });

  describe('#isCompleted', () => {
    const cases = [
      [['SLACK'], false],
      [['HELLO', 'QUITE', 'FANCY'], false],
      [['HELLO', 'QUITE', 'PANIC', 'EMAIL', 'CRAZY'], true],
      [['HELLO', 'WORLD', 'FRESH', 'CRAZY', 'QUITE', 'FANCY'], true],
    ] as [string[], boolean][];

    describe.each(cases)('case %#', (inputs, expectedOutput) => {
      it('returns whether the game is completed', () => {
        for (const input of inputs) game.guess(input);
        const output = game.isCompleted();
        expect(output).toEqual(expectedOutput);
      });
    });
  });
});
