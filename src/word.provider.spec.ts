import { provideWords } from './word.provider';

describe(provideWords.name, () => {
  it('return words', async () => {
    const result = await provideWords('words.mock.txt');
    expect(result).toEqual(['ONE', 'TWO', 'THREE']);
  });
});
