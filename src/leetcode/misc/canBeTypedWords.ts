export function canBeTypedWords(text: string, brokenLetters: string): number {
  let brokenSet = new Set(brokenLetters.split(''));
  let words = text.split(' ');
  let count = 0;
  for (let word of words) {
    if (![...word].some((char) => brokenSet.has(char))) count++;
  }
  return count;
}
