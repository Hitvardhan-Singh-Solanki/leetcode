import { trap } from './maxWaterTrap';

describe('trap', () => {
  describe('Basic cases', () => {
    it('should calculate trapped water for basic case', () => {
      expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    });

    it('should handle simple V shape', () => {
      expect(trap([3, 0, 2, 0, 4])).toBe(7);
    });

    it('should handle increasing heights', () => {
      expect(trap([1, 2, 3, 4, 5])).toBe(0);
    });

    it('should handle decreasing heights', () => {
      expect(trap([5, 4, 3, 2, 1])).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty array', () => {
      expect(trap([])).toBe(0);
    });

    it('should handle single element', () => {
      expect(trap([1])).toBe(0);
      expect(trap([0])).toBe(0);
    });

    it('should handle two elements', () => {
      expect(trap([1, 2])).toBe(0);
      expect(trap([2, 1])).toBe(0);
    });

    it('should handle all same heights', () => {
      expect(trap([1, 1, 1, 1])).toBe(0);
    });

    it('should handle all zeros', () => {
      expect(trap([0, 0, 0, 0])).toBe(0);
    });
  });

  describe('Complex cases', () => {
    it('should handle multiple peaks', () => {
      expect(trap([1, 0, 2, 0, 1])).toBe(2);
      expect(trap([2, 0, 1, 0, 2])).toBe(5);
    });

    it('should handle valley in middle', () => {
      expect(trap([3, 2, 1, 2, 3])).toBe(4);
    });

    it('should handle alternating heights', () => {
      expect(trap([1, 3, 1, 3, 1])).toBe(2);
    });

    it('should handle large differences', () => {
      expect(trap([5, 0, 0, 0, 5])).toBe(15);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
      expect(trap([4, 2, 0, 3, 2, 5])).toBe(9);
    });
  });

  describe('Performance cases', () => {
    it('should handle large arrays efficiently', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) =>
        Math.floor(Math.random() * 100)
      );
      const result = trap(largeArray);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
});
