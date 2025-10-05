import { numOfUnplacedFruits } from './numOfUnplacedFruits';

describe('numOfUnplacedFruits', () => {
  it('should return 0 when all fruits can be placed easily', () => {
    const fruits = [1, 2, 3];
    const baskets = [3, 3, 3];
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(0);
  });

  it('should return all fruits unplaced if no basket can fit them', () => {
    const fruits = [5, 6, 7];
    const baskets = [1, 2, 3];
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(3);
  });

  it('should return correct count when some fruits cannot be placed', () => {
    const fruits = [4, 2, 5];
    const baskets = [3, 5, 4];
    // 4 -> goes to basket[1] (5), 2 -> basket[0] (3), 5 -> no basket left
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(1);
  });

  it('should place fruits in leftmost valid baskets', () => {
    const fruits = [2, 2, 2];
    const baskets = [2, 2, 2];
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(0);
  });

  it('should handle duplicate basket capacities', () => {
    const fruits = [2, 3, 1];
    const baskets = [2, 2, 3];
    // 2 -> basket[0] (2), 3 -> basket[2] (3), 1 -> basket[1] (2)
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(0);
  });

  it('should handle empty inputs', () => {
    const fruits: number[] = [];
    const baskets: number[] = [];
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(0);
  });

  it('should handle case where baskets are smaller than all fruits', () => {
    const fruits = [10, 12, 15];
    const baskets = [5, 5, 5];
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(3);
  });

  it('should handle mixed scenario with leftover baskets', () => {
    const fruits = [2, 4];
    const baskets = [1, 5, 5];
    // 2 -> basket[1] (5), 4 -> basket[2] (5)
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(0);
  });

  it('should not place a fruit in a smaller basket even if one is free later', () => {
    const fruits = [5, 2];
    const baskets = [2, 5];
    // 5 -> basket[1] (5), 2 -> basket[0] (2)
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(0);
  });

  it('should return correct count for large numbers', () => {
    const fruits = [1000000000, 1];
    const baskets = [1, 1000000000];
    // 1000000000 -> basket[1], 1 -> basket[0]
    expect(numOfUnplacedFruits(fruits, baskets)).toBe(0);
  });
});
