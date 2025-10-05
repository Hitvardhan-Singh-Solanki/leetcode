export function mostPoints(questions: number[][]): number {
  const n = questions.length;
  const dp = new Array(n + 1).fill(0);
  dp[n] = 0;
  for (let i = n - 1; i >= 0; i--) {
    const [points, brainPower] = questions[i];
    const nextIndex = i + brainPower + 1;
    dp[i] = Math.max(
      dp[i + 1], // skip
      points + (nextIndex < n ? dp[nextIndex] : 0) // include
    );
  }
  return dp[0];
}
