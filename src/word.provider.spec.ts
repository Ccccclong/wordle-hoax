import { provideWords } from './word.provider';

describe(provideWords.name, () => {
  it('return words', async () => {
    const result = await provideWords('words.mock.txt');
    expect(result).toEqual([
      'HELLO',
      'WORLD',
      'QUITE',
      'FANCY',
      'FRESH',
      'PANIC',
      'CRAZY',
      'BUGGY',
    ]);
  });
});
