export function minCostClimbingStairs(cost: number[]): number {
  const dp = [];
  const l = cost.length;

  for (let i = 0; i < l; i++) {
    if (i === 0 || i === 1) {
      dp[i] = cost[i];
      continue;
    }

    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
  }
  return Math.min(dp[l - 1], dp[l - 2]);
}
