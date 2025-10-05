export function pacificAtlantic(heights: number[][]): number[][] {
  if (heights.length === 0 || heights[0].length === 0) return [];
  const m = heights.length;
  const n = heights[0].length;
  const pacificReachable: boolean[][] = Array.from({ length: m }, () =>
    Array(n).fill(false)
  );
  const atlanticReachable: boolean[][] = Array.from({ length: m }, () =>
    Array(n).fill(false)
  );

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dfs = (x: number, y: number, reachable: boolean[][]) => {
    reachable[x][y] = true;
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (
        newX >= 0 &&
        newX < m &&
        newY >= 0 &&
        newY < n &&
        !reachable[newX][newY] &&
        heights[newX][newY] >= heights[x][y]
      ) {
        dfs(newX, newY, reachable);
      }
    }
  };

  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacificReachable);
    dfs(i, n - 1, atlanticReachable);
  }

  for (let j = 0; j < n; j++) {
    dfs(0, j, pacificReachable);
    dfs(m - 1, j, atlanticReachable);
  }

  const result: number[][] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacificReachable[i][j] && atlanticReachable[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
}
