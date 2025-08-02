import { minCost } from './minCost';

describe('minCost', () => {
  describe('leetcode examples', () => {
    it('should handle example 1 - possible swap', () => {
      const basket1 = [4, 2, 2, 2];
      const basket2 = [1, 4, 1, 2];
      expect(minCost(basket1, basket2)).toBe(1);
    });

    it('should handle example 2 - impossible case', () => {
      const basket1 = [2, 3, 4, 1];
      const basket2 = [3, 2, 5, 1];
      expect(minCost(basket1, basket2)).toBe(-1);
    });
  });

  describe('edge cases', () => {
    it('should handle single element baskets', () => {
      expect(minCost([1], [1])).toBe(0);
      expect(minCost([2], [1])).toBe(-1);
    });

    it('should handle already equal baskets', () => {
      const basket1 = [1, 2, 3];
      const basket2 = [3, 1, 2];
      expect(minCost(basket1, basket2)).toBe(0);
    });

    it('should handle all same numbers', () => {
      const basket1 = [2, 2, 2];
      const basket2 = [2, 2, 2];
      expect(minCost(basket1, basket2)).toBe(0);
    });
  });

  describe('complex cases', () => {
    it('should detect impossible cases with same numbers but different frequencies', () => {
      const basket1 = [1, 1, 2];
      const basket2 = [1, 2, 2];
      expect(minCost(basket1, basket2)).toBe(-1);
    });
  });
});
