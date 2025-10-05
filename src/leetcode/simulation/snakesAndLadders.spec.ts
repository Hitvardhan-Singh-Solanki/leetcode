import { snakesAndLadders } from './snakesAndLadders';

describe('snakesAndLadders', () => {
  it('should return the correct response', () => {
    const board = [
      [-1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1],
      [-1, 35, -1, -1, 13, -1],
      [-1, -1, -1, -1, -1, -1],
      [-1, 15, -1, -1, -1, -1],
    ];
    const res = snakesAndLadders(board);
    expect(res).toBe(4);
  });
});
