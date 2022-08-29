export function getOccurences(str: string, regExp: RegExp): number {
  return (str.match(regExp) ?? []).length;
}

export function isAllAlphabet(str: string): boolean {
  return !/[^a-zA-Z]/.test(str);
}
