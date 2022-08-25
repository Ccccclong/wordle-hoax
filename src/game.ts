import { getOccurences } from './utils';

export class Game {
  private numRounds = 0;
  private possibleWords: string[];

  constructor(private readonly words: string[]) {
    this.possibleWords = words;
  }

  guess(word: string): string {
    this.numRounds++;
    if (!this.words.includes(word)) {
      return 'Unknown word';
    }
    const bestMatch = this.computeBestMatch(word);
    return this.createResponse(bestMatch);
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

  private createResponse(match: string): string {
    if (match === 'XXXXX') {
      return `${match} in ${this.numRounds} rounds`;
    }
    if (this.numRounds === 6) {
      const correctWord = this.getCorrectWord();
      return `${match}\nThe correct word is ${correctWord}`;
    }
    return match;
  }

  private getCorrectWord(): string {
    return this.possibleWords[0];
  }
}

function computeMatch(guessWord: string, answerWord: string): string {
  const guessChars = guessWord.split('');
  const matchChars = guessChars.map((guessChar, guessIndex) => {
    const answerIndex = answerWord.indexOf(guessChar);
    if (answerIndex === -1) return '_';
    if (answerIndex === guessIndex) return 'X';
    return '?';
  });
  return matchChars.join('');
}

function computeMatchScore(match: string) {
  return getOccurences(match, /X/g) * 10 + getOccurences(match, /\?/g);
}
