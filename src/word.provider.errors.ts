export class WordsFileNotFoundError extends Error {
  constructor() {
    super(
      'The words file cannot be found. Please make sure to create one at project root.'
    );
  }
}
