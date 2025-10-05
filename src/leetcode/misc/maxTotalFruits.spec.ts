import { maxTotalFruits } from './maxTotalFruits';

describe('maxTotalFruits', () => {
  it('should return correct output for example 1', () => {
    const fruits = [
      [2, 8],
      [6, 3],
      [8, 6],
    ];
    const startPos = 5;
    const k = 4;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(9);
  });

  it('should return correct output for example 2', () => {
    const fruits = [
      [0, 9],
      [4, 1],
      [5, 7],
      [6, 2],
      [7, 4],
      [10, 9],
    ];
    const startPos = 5;
    const k = 4;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(14);
  });

  it('should return correct output for example 3', () => {
    const fruits = [
      [0, 3],
      [6, 4],
      [8, 5],
    ];
    const startPos = 3;
    const k = 2;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(0);
  });

  it('should handle case where all fruits are at the same position as startPos', () => {
    const fruits = [[5, 10]];
    const startPos = 5;
    const k = 3;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(10);
  });

  it('should handle case where k is 0 (no movement allowed)', () => {
    const fruits = [
      [2, 5],
      [5, 10],
    ];
    const startPos = 5;
    const k = 0;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(10);
  });

  it('should handle case where fruits are only on one side', () => {
    const fruits = [
      [7, 4],
      [8, 6],
      [9, 5],
    ];
    const startPos = 5;
    const k = 5;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(15);
  });

  it('should handle case where fruits are very far away', () => {
    const fruits = [
      [100, 10],
      [200, 20],
    ];
    const startPos = 0;
    const k = 50;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(0);
  });

  it('should handle large input where optimal path is to go left first', () => {
    const fruits = [
      [0, 5],
      [1, 6],
      [4, 7],
      [5, 8],
      [7, 9],
    ];
    const startPos = 5;
    const k = 5;
    // best route: harvest (5 -> 4 -> 1 -> 0) = 8 + 7 + 6 + 5 = 26
    expect(maxTotalFruits(fruits, startPos, k)).toBe(26);
  });

  it('should handle edge case where no fruits at start or within range', () => {
    const fruits = [
      [10, 5],
      [20, 5],
    ];
    const startPos = 0;
    const k = 5;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(0);
  });

  it('should handle single fruit within reach', () => {
    const fruits = [[3, 7]];
    const startPos = 5;
    const k = 3;
    expect(maxTotalFruits(fruits, startPos, k)).toBe(7);
  });
});
