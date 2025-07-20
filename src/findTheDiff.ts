export function findTheDifference(s: string, t: string): string {
  const freq: { [key: string]: number } = {};
  let res = '';
  for (const ch of s) {
    if (freq[ch]) freq[ch]++;
    else freq[ch] = 1;
  }

  for (const ch of t) {
    if (freq[ch]) freq[ch]--;
    else res += ch;
  }
  return res;
}
