export function new21Game(n: number, k: number, maxPts: number): number {
  if (k === 0 || n >= k - 1 + maxPts) return 1.0;
  if (n < k) return 0.0;
  const dp: number[] = Array(n + 1).fill(0.0);
  for (let i = 1; i <= n; i++) {
    dp[i] = 1.0;
  }
  const right = Math.min(n, k + maxPts - 1);
  let window = 0.0;
  for (let i = k; i <= right; i++) {
    window += dp[i];
  }
  for (let i = k - 1; i >= 0; i--) {
    dp[i] = window / maxPts;
    window += dp[i];
    if (i + maxPts <= n) window -= dp[i + maxPts];
  }
  return dp[0];
}
