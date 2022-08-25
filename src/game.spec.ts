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
    ];

    describe.each(cases)('case %#', (inputs, expectedOutputs) => {
      it('returns output strings', () => {
        const outputs = inputs.map((input) => game.guess(input));
        expect(outputs).toEqual(expectedOutputs);
      });
    });
  });
});
