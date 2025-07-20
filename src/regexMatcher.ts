export function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;

  const grid: boolean[][] = new Array(m + 1)
    .fill(null)
    .map(() => new Array(n + 1).fill(false));
  grid[0][0] = true;

  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') grid[0][j] = grid[0][j - 1];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === '?')
        grid[i][j] = grid[i - 1][j - 1];
      else if (p[j - 1] === '*') grid[i][j] = grid[i][j - 1] || grid[i - 1][j];
    }
  }

  return grid[m][n];
}
