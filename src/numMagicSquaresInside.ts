export function numMagicSquaresInside(grid: number[][]): number {
  const isMagic = (grid: number[][], x: number, y: number) => {
    const digits = new Array(10).fill(0);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const num = grid[x + i][y + j];
        if (num < 1 || num > 9 || digits[num]) {
          return false;
        }
        digits[num] = 1;
      }
    }

    return (
      grid[x][y] + grid[x][y + 1] + grid[x][y + 2] === 15 &&
      grid[x + 1][y] + grid[x + 1][y + 1] + grid[x + 1][y + 2] === 15 &&
      grid[x + 2][y] + grid[x + 2][y + 1] + grid[x + 2][y + 2] === 15 &&
      grid[x][y] + grid[x + 1][y] + grid[x + 2][y] === 15 &&
      grid[x][y + 1] + grid[x + 1][y + 1] + grid[x + 2][y + 1] === 15 &&
      grid[x][y + 2] + grid[x + 1][y + 2] + grid[x + 2][y + 2] === 15 &&
      grid[x][y] + grid[x + 1][y + 1] + grid[x + 2][y + 2] === 15 &&
      grid[x][y + 2] + grid[x + 1][y + 1] + grid[x + 2][y] === 15
    );
  };

  let count = 0;
  for (let i = 0; i < grid.length - 2; i++) {
    for (let j = 0; j < grid[0].length - 2; j++) {
      if (isMagic(grid, i, j)) {
        count++;
      }
    }
  }
  return count;
}
