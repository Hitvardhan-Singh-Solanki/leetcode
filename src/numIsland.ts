const DIR = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

export function numIslands(grid: string[][]): number {
  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'O') {
        res++;
        dfs(grid, i, j);
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'S') grid[i][j] = 'X';
    }
  }

  console.log(grid);

  return res;
}

function dfs(grid: string[][], currRow: number, currCol: number) {
  if (
    currRow >= grid.length - 1 ||
    currCol >= grid[0].length - 1 ||
    currRow <= 0 ||
    currCol <= 0 ||
    grid[currRow][currCol] === 'X' ||
    grid[currRow][currCol] === 'S'
  )
    return;

  grid[currRow][currCol] = 'S';

  for (const [rowDir, colDir] of DIR) {
    dfs(grid, currRow + rowDir, currCol + colDir);
  }
}
