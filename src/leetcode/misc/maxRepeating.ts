export function maxRepeating(sequence: string, word: string): number {
  const n = sequence.length;
  const m = word.length;
  if (n < m) return 0;
  const dp = new Array(n).fill(0);
  let maxRepeating = 0;
  for (let i = n - m; i >= 0; i--) {
    if (sequence.slice(i, i + m) === word) {
      dp[i] = 1 + (i + m < n ? dp[i + m] : 0);
      maxRepeating = Math.max(maxRepeating, dp[i]);
    }
  }
  return maxRepeating;
}
