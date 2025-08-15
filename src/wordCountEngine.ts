/**
 * Counts the frequency of each sanitized word in the input document and returns a sorted list of word-frequency pairs.
 *
 * The document is split into words, each word is converted to lowercase and stripped of non-alphabetic characters, and empty results are ignored. The output is sorted by descending frequency; words with the same frequency retain their original order of appearance.
 *
 * @param document - The input string to analyze
 * @returns An array of `[word, frequency]` pairs, where frequency is a string representing the count
 */
export function wordCountEngine(document: string): string[][] {
  const freqMap = document
    .split(' ')
    .map(sanitizeWord)
    .filter((word) => word !== '')
    .reduce((acc, word) => {
      acc.set(word, (acc.get(word) || 0) + 1);
      return acc;
    }, new Map<string, number>());

  const res = [];

  for (let [key, val] of freqMap) res.push([key, '' + val]);

  return res.sort((a: string[], b: string[]) => {
    const countDiff = Number(b[1]) - Number(a[1]);
    if (countDiff !== 0) return countDiff;
    return freqMap.get(a[0])! - freqMap.get(b[0])!;
  });
}

/**
 * Returns a sanitized version of the input word containing only lowercase alphabetic characters.
 *
 * Non-alphabetic characters are removed and all letters are converted to lowercase.
 *
 * @param word - The word to sanitize
 * @returns The sanitized, lowercase word with only letters a-z
 */
function sanitizeWord(word: string): string {
  const charArr: string[] = [];
  for (let c of word.toLocaleLowerCase())
    if (
      'a'.charCodeAt(0) <= c.charCodeAt(0) &&
      c.charCodeAt(0) <= 'z'.charCodeAt(0)
    )
      charArr.push(c);

  return charArr.join('');
}
