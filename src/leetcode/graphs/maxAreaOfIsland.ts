const DIR = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

export function maxAreaOfIsland(grid: number[][]): number {
  let area = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        area = Math.max(area, dfs(grid, i, j));
      }
    }
  }
  return area;
}

function dfs(grid: number[][], currRow: number, currCol: number): number {
  if (
    currRow < 0 ||
    currCol < 0 ||
    currRow >= grid.length ||
    currCol >= grid[0].length ||
    grid[currRow][currCol] === 0
  )
    return 0;
  let currArea = 0;

  currArea++;
  grid[currRow][currCol] = 0;

  for (const [rowDir, colDir] of DIR) {
    const res = dfs(grid, currRow + rowDir, currCol + colDir);
    currArea += res;
  }

  return currArea;
}
