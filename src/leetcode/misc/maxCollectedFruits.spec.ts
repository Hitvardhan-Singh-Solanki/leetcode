import { maxCollectedFruits } from './maxCollectedFruits';

describe('maxCollectedFruits', () => {
  it('Example 1: 4x4 grid with overlapping paths', () => {
    const fruits = [
      [1, 2, 3, 4],
      [5, 6, 8, 7],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const result = maxCollectedFruits(fruits);
    expect(result).toBe(100);
  });

  it('Example 2: 2x2 grid with full overlap on end cell', () => {
    const fruits = [
      [1, 1],
      [1, 1],
    ];
    const result = maxCollectedFruits(fruits);
    expect(result).toBe(4);
  });
});
