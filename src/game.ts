import { NoWordsError, WordFormatError } from './game.errors';
import { getOccurences, isAllAlphabet } from './utils';

export class Game {
  private numRounds = 0;
  private hasWon = false;
  private readonly words: string[];
  private possibleWords: string[];

  constructor(words: string[]) {
    validateWords(words);
    this.words = words.map((word) => word.toUpperCase());
    this.possibleWords = this.words;
  }

  guess(word: string): string {
    const uppercaseWord = word.toUpperCase();
    if (!this.words.includes(uppercaseWord)) {
      return 'Unknown word';
    }

    this.numRounds++;
    const response = this.processGuessWord(uppercaseWord);

    if (this.isCompleted() && !this.hasWon) {
      const correctWord = this.getCorrectWord();
      const answerReveal = `The correct word is ${correctWord}`;
      return `${response}\n${answerReveal}`;
    }

    return response;
  }

  isCompleted(): boolean {
    return this.numRounds >= 6 || this.hasWon;
  }

  private processGuessWord(word: string): string {
    const bestMatch = this.computeBestMatch(word);
    if (bestMatch === 'XXXXX') {
      this.hasWon = true;
      return `${bestMatch} in ${this.numRounds} rounds`;
    }
    return bestMatch;
  }

  private computeBestMatch(word: string): string {
    const matches = this.computeMatches(word);
    const matchScores = matches.map(computeMatchScore);
    const minMatchScore = Math.min(...matchScores);
    const bestMatch = matches[matchScores.indexOf(minMatchScore)];

    this.possibleWords = matches
      .map((match, index) =>
        match === bestMatch ? this.possibleWords[index] : undefined
      )
      .filter((word): word is string => word !== undefined);

    return bestMatch;
  }

  private computeMatches(word: string): string[] {
    return this.possibleWords.map((possibleWord) =>
      computeMatch(word, possibleWord)
    );
  }

  private getCorrectWord(): string {
    return this.possibleWords[0];
  }
}

function validateWords(words: string[]) {
  if (words.length === 0) throw new NoWordsError();
  for (const word of words) {
    if (word.length !== 5)
      throw new WordFormatError(word, 'Must be consisted of 5 characters');
    if (!isAllAlphabet(word))
      throw new WordFormatError(word, 'Must be alphabetic characters only');
  }
}

function computeMatch(guessWord: string, answerWord: string): string {
  const guessChars = guessWord.split('');
  const answerChars = answerWord.split('');
  const matchChars = ['_', '_', '_', '_', '_'];

  for (let guessIndex = 0; guessIndex < guessChars.length; guessIndex++) {
    const guessChar = guessChars[guessIndex];
    const answerChar = answerChars[guessIndex];
    if (guessChar === answerChar) {
      matchChars[guessIndex] = 'X';
      answerChars[guessIndex] = '';
    }
  }

  for (let guessIndex = 0; guessIndex < guessChars.length; guessIndex++) {
    if (matchChars[guessIndex] !== '_') continue;
    const guessChar = guessChars[guessIndex];
    const answerIndex = answerChars.indexOf(guessChar);
    if (answerIndex !== -1) {
      matchChars[guessIndex] = '?';
      answerChars[answerIndex] = '';
    }
  }

  return matchChars.join('');
}

function computeMatchScore(match: string) {
  return getOccurences(match, /X/g) * 10 + getOccurences(match, /\?/g);
}
