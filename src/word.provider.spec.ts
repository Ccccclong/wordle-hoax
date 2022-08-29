import { WordsFileNotFoundError } from './word.provider.errors';
import { provideWords } from './word.provider';

describe(provideWords.name, () => {
  let filePath: string;
  let subject: () => Promise<string[]>;

  beforeEach(() => {
    subject = () => provideWords(filePath);
  });

  describe('when the file exists', () => {
    beforeEach(() => {
      filePath = 'words.mock.txt';
    });

    it('return words', () =>
      expect(subject()).resolves.toEqual([
        'HELLO',
        'WORLD',
        'QUITE',
        'FANCY',
        'FRESH',
        'PANIC',
        'CRAZY',
        'BUGGY',
      ]));
  });

  describe('when the file does not exists', () => {
    beforeEach(() => {
      filePath = 'non-exist-words.mock.txt';
    });

    it('throw WordsFileNotFoundError', () =>
      expect(subject()).rejects.toBeInstanceOf(WordsFileNotFoundError));
  });
});
