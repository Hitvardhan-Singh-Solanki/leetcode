const DICE = [1, 2, 3, 4, 5, 6];

export function snakesAndLadders(board: number[][]): number {
  const n = board.length;
  const end = n * n;
  const seen = new Set<number>();

  let queue: number[] = [1];
  let steps = 1;

  while (queue.length > 0) {
    const pending: number[] = [];

    while (queue.length > 0) {
      const i = queue.shift()!;
      for (const dice of DICE) {
        let loc = i + dice;
        const val = getValue(board, loc);
        if (val !== -1) {
          loc = val;
        }

        if (seen.has(loc) || loc > end) {
          continue;
        }

        if (loc === end) {
          return steps;
        }

        seen.add(loc);
        pending.push(loc);
      }
    }

    queue = pending;
    steps++;
  }

  return -1;
}

function getValue(board: number[][], loc: number): number {
  const pos = loc - 1; // board is 1-based, but data is 0-based
  const n = board.length;
  const rowFromBottom = Math.floor(pos / n);
  const row = n - 1 - rowFromBottom;

  const offset = pos % n;
  const isBackwards = rowFromBottom % 2 === 1;

  const col = isBackwards ? n - 1 - offset : offset;

  return board[row]?.[col];
}
