export function getOccurences(str: string, regExp: RegExp): number {
  return (str.match(regExp) ?? []).length;
}
