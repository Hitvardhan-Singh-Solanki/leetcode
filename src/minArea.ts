export function minimumArea(grid: number[][]): number {
  let top = Infinity;
  let left = Infinity;
  let bottom = -Infinity;
  let right = -Infinity;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) {
        top = Math.min(row, top);
        bottom = Math.max(row, bottom);
        left = Math.min(col, left);
        right = Math.max(col, right);
      }
    }
  }
  return (bottom - top + 1) * (right - left + 1);
}
