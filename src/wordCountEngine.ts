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
