export function maxCollectedFruits(fruits: number[][]): number {
  const n = fruits.length;
  let count = 0;

  // child 1 collects from top left to bottom left marking all the cells as 0
  for (let i = 0; i < n; i++) {
    count += fruits[i][i];
  }

  const dp = (): number => {
    let prev: number[] = Array(n).fill(Number.MIN_SAFE_INTEGER);
    let curr: number[] = Array(n).fill(Number.MIN_SAFE_INTEGER);
    // starting position
    prev[n - 1] = fruits[0][n - 1];

    for (let i = 1; i < n - 1; i++) {
      let j = Math.max(n - 1 - i, i + 1);
      for (; j < n; j++) {
        let best = prev[j];
        if (j - 1 >= 0) best = Math.max(best, prev[j - 1]);
        if (j + 1 < n) best = Math.max(best, prev[j + 1]);
        curr[j] = best + fruits[i][j];
      }
      [prev, curr] = [curr, prev];
    }

    return prev[n - 1];
  };

  // child 2
  count += dp();

  // transpose the matrix
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < i; ++j) {
      [fruits[i][j], fruits[j][i]] = [fruits[j][i], fruits[i][j]];
    }
  }
  // child 3
  count += dp();

  return count;
}
