export function islandPerimeter(grid: number[][]): number {
  let perimeter = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const LAND_CELL = 1;

  for (let row = 0; row < rows; ++row) {
    for (let col = 0; col < cols; ++col) {
      if (grid[row][col] === LAND_CELL) {
        let neighbouringLand = 4;

        if (row > 0 && grid[row - 1][col] === LAND_CELL) {
          neighbouringLand -= 2;
        }

        if (col > 0 && grid[row][col - 1] === LAND_CELL) {
          neighbouringLand -= 2;
        }

        perimeter += neighbouringLand;
      }
    }
  }

  return perimeter;
}
