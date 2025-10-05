export function countSubIslands(grid1: number[][], grid2: number[][]): number {
  let count = 0;

  for (let row = 0; row < grid2.length; row++) {
    for (let col = 0; col < grid2[0].length; col++) {
      if (!grid2[row][col]) continue;
      if (dfs(row, col, grid1, grid2)) count++;
    }
  }

  return count;
}

function dfs(
  row: number,
  col: number,
  grid1: number[][],
  grid2: number[][]
): boolean {
  if (row < 0 || row >= grid2.length || col < 0 || col >= grid2[0].length)
    return true;

  if (!grid2[row][col]) return true;

  grid2[row][col] = 0;

  return (
    dfs(row - 1, col, grid1, grid2) &&
    dfs(row, col + 1, grid1, grid2) &&
    dfs(row + 1, col, grid1, grid2) &&
    dfs(row, col - 1, grid1, grid2) &&
    Boolean(grid1[row][col])
  );
}
