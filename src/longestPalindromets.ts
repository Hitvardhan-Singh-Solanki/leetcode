export function longestPalindrome(words: string[]): number {
  const freq: number[][] = Array.from({ length: 26 }, () => Array(26).fill(0));
  const aASCII = 'a'.charCodeAt(0);

  for (const w of words)
    freq[w.charCodeAt(0) - aASCII][w.charCodeAt(1) - aASCII]++;

  let total = 0;
  let center = false;

  for (let i = 0; i < 26; i++) {
    total += Math.floor(freq[i][i] / 2) * 4;

    if (freq[i][i] % 2 === 1) center = true;

    for (let j = i + 1; j < 26; j++) {
      const pairs = Math.min(freq[i][j], freq[j][i]);
      total += pairs * 4;
    }
  }

  if (center) total += 2;

  return total;
}
