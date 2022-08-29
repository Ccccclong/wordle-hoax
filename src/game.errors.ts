export class NoWordsError extends Error {
  constructor() {
    super('There must be at least 1 word');
  }
}

export class WordFormatError extends Error {
  constructor(word: string, reason: string) {
    super(`The word '${word}' is in the wrong format: ${reason}`);
  }
}
