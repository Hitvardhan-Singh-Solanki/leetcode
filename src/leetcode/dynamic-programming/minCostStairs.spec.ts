import { minCostClimbingStairs } from './minCostStairs';

describe('minCostClimbingStairs', () => {
  describe('Basic functionality', () => {
    it('should find minimum cost for basic stairs', () => {
      expect(minCostClimbingStairs([10, 15, 20])).toBe(15);
      expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(
        6
      );
    });

    it('should handle two steps', () => {
      expect(minCostClimbingStairs([10, 15])).toBe(10);
      expect(minCostClimbingStairs([1, 2])).toBe(1);
    });

    it('should handle three steps', () => {
      expect(minCostClimbingStairs([1, 2, 3])).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle minimum length stairs', () => {
      expect(minCostClimbingStairs([10, 15])).toBe(10);
    });

    it('should handle stairs with same cost', () => {
      expect(minCostClimbingStairs([5, 5, 5, 5])).toBe(10);
    });

    it('should handle stairs with zeros', () => {
      expect(minCostClimbingStairs([0, 0, 0, 0])).toBe(0);
      expect(minCostClimbingStairs([0, 1, 0, 1])).toBe(0);
    });
  });

  describe('Complex cases', () => {
    it('should handle increasing costs', () => {
      expect(minCostClimbingStairs([1, 2, 3, 4, 5])).toBe(6);
    });

    it('should handle decreasing costs', () => {
      expect(minCostClimbingStairs([5, 4, 3, 2, 1])).toBe(6);
    });

    it('should handle alternating costs', () => {
      expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(
        6
      );
    });

    it('should handle large costs', () => {
      expect(minCostClimbingStairs([100, 1, 100, 1, 100, 1])).toBe(3);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      expect(minCostClimbingStairs([10, 15, 20])).toBe(15);
      expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(
        6
      );
    });
  });
});
