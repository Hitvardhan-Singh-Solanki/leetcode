import { maxProfit } from './maxProfit';

describe('maxProfit', () => {
  describe('Basic cases', () => {
    it('should find maximum profit for increasing prices', () => {
      expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
      expect(maxProfit([1, 2])).toBe(1);
    });

    it('should find maximum profit for mixed prices', () => {
      expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
      expect(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])).toBe(4);
    });

    it('should return 0 for decreasing prices', () => {
      expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
      expect(maxProfit([5, 4, 3, 2, 1])).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle single element array', () => {
      expect(maxProfit([1])).toBe(0);
      expect(maxProfit([5])).toBe(0);
    });

    it('should handle two elements', () => {
      expect(maxProfit([1, 2])).toBe(1);
      expect(maxProfit([2, 1])).toBe(0);
      expect(maxProfit([1, 1])).toBe(0);
    });

    it('should handle empty array', () => {
      expect(maxProfit([])).toBe(0);
    });

    it('should handle all same prices', () => {
      expect(maxProfit([1, 1, 1, 1])).toBe(0);
      expect(maxProfit([5, 5, 5, 5, 5])).toBe(0);
    });
  });

  describe('Complex cases', () => {
    it('should handle prices with multiple peaks and valleys', () => {
      expect(maxProfit([2, 4, 1])).toBe(2);
      expect(maxProfit([1, 2, 4, 2, 5, 7, 2, 4, 9, 0])).toBe(8);
    });

    it('should handle prices starting high then dropping', () => {
      expect(maxProfit([10, 7, 5, 8, 11, 9])).toBe(6);
    });

    it('should handle prices with single peak', () => {
      expect(maxProfit([1, 2, 3, 2, 1])).toBe(2);
    });

    it('should handle prices with single valley', () => {
      expect(maxProfit([3, 2, 1, 2, 3])).toBe(2);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
      expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
    });
  });

  describe('Performance cases', () => {
    it('should handle large arrays efficiently', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) =>
        Math.floor(Math.random() * 1000)
      );
      const result = maxProfit(largeArray);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
});
