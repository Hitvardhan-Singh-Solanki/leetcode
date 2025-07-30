import { countHillValley } from './countHillValley';

describe('countHillValley', () => {
  describe('basic functionality', () => {
    it('should count hills and valleys correctly in a mixed array', () => {
      const nums = [2, 4, 1, 1, 6, 5];
      const result = countHillValley(nums);
      expect(result).toBe(3);
    });

    it('should return 0 for monotonic decreasing array', () => {
      const nums = [6, 6, 5, 5, 4, 1];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should handle array with consecutive equal values', () => {
      const nums = [5, 7, 7, 1, 7];
      const result = countHillValley(nums);
      expect(result).toBe(2);
    });

    it('should identify a simple hill pattern', () => {
      const nums = [1, 3, 2];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should identify a simple valley pattern', () => {
      const nums = [3, 1, 2];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should return 0 for empty array', () => {
      const nums: number[] = [];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should return 0 for single element array', () => {
      const nums = [42];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should return 0 for two element array', () => {
      const nums = [1, 2];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should return 0 for array with all equal elements', () => {
      const nums = [5, 5, 5, 5, 5];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should return 0 for strictly increasing array', () => {
      const nums = [1, 2, 3, 4, 5];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should return 0 for strictly decreasing array', () => {
      const nums = [5, 4, 3, 2, 1];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should handle minimum valid array producing hill', () => {
      const nums = [1, 2, 1];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should handle minimum valid array producing valley', () => {
      const nums = [2, 1, 2];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should handle minimum valid array with no hill or valley', () => {
      const nums = [1, 2, 3];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });
  });

  describe('consecutive equal values handling', () => {
    it('should handle many consecutive equal values', () => {
      const nums = [1, 1, 1, 3, 3, 3, 2, 2, 2];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should handle array starting with equal values', () => {
      const nums = [2, 2, 2, 4, 3];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should handle array ending with equal values', () => {
      const nums = [1, 3, 2, 2, 2];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should handle equal values between hill and valley', () => {
      const nums = [1, 3, 2, 2, 2, 4, 1];
      const result = countHillValley(nums);
      expect(result).toBe(2);
    });

    it('should handle multiple plateaus in sequence', () => {
      const nums = [1, 1, 3, 3, 2, 2, 4, 4, 1, 1];
      const result = countHillValley(nums);
      expect(result).toBe(2);
    });
  });

  describe('multiple hills and valleys', () => {
    it('should count multiple hills correctly', () => {
      const nums = [1, 3, 2, 4, 1];
      const result = countHillValley(nums);
      expect(result).toBe(3);
    });

    it('should count multiple valleys correctly', () => {
      const nums = [3, 1, 4, 2, 5];
      const result = countHillValley(nums);
      expect(result).toBe(3);
    });

    it('should handle alternating hills and valleys', () => {
      const nums = [1, 5, 2, 6, 3, 7, 4];
      const result = countHillValley(nums);
      expect(result).toBe(5);
    });

    it('should handle complex pattern with multiple peaks and valleys', () => {
      const nums = [1, 4, 2, 5, 1, 6, 3, 7, 2];
      const result = countHillValley(nums);
      expect(result).toBe(7);
    });
  });

  describe('numeric boundary testing', () => {
    it('should handle large positive numbers', () => {
      const nums = [1000000, 2000000, 1500000];
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should handle negative numbers', () => {
      const nums = [-5, -2, -7, -1, -3];
      const result = countHillValley(nums);
      expect(result).toBe(2);
    });

    it('should handle mix of positive and negative numbers', () => {
      const nums = [-2, 1, -3, 0, -1];
      const result = countHillValley(nums);
      expect(result).toBe(3);
    });

    it('should handle zeros in the array', () => {
      const nums = [0, 1, 0, 2, 0];
      const result = countHillValley(nums);
      expect(result).toBe(3);
    });

    it('should handle array with only zeros', () => {
      const nums = [0, 0, 0, 0];
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should handle decimal numbers', () => {
      const nums = [1.5, 2.5, 1.8, 3.2, 0.9];
      const result = countHillValley(nums);
      expect(result).toBe(2);
    });
  });

  describe('algorithm correctness verification', () => {
    it('should correctly remove consecutive duplicates before processing', () => {
      // This tests the first phase of the algorithm
      const nums = [1, 1, 2, 2, 3, 3, 2, 2, 1, 1];
      const result = countHillValley(nums);
      // After cleaning: [1, 2, 3, 2, 1] which has 2 hills/valleys
      expect(result).toBe(2);
    });

    it('should identify hills where prev < curr > next', () => {
      const nums = [1, 5, 2]; // Clear hill at index 1
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should identify valleys where prev > curr < next', () => {
      const nums = [5, 1, 4]; // Clear valley at index 1
      const result = countHillValley(nums);
      expect(result).toBe(1);
    });

    it('should not count endpoints as hills or valleys', () => {
      const nums = [1, 2, 3]; // Increasing sequence - no hills/valleys
      const result = countHillValley(nums);
      expect(result).toBe(0);
    });

    it('should handle complex real-world scenario', () => {
      const nums = [2, 4, 1, 1, 6, 5, 5, 3, 3, 7, 2];
      const result = countHillValley(nums);
      // After cleaning: [2, 4, 1, 6, 5, 3, 7, 2]
      // Hills/valleys at: 4(hill), 1(valley), 6(hill), 3(valley), 7(hill)
      expect(result).toBe(5);
    });
  });

  describe('performance characteristics', () => {
    it('should handle moderately large arrays efficiently', () => {
      const nums = Array.from({ length: 1000 }, (_, i) => i % 10);
      const start = Date.now();
      const result = countHillValley(nums);
      const end = Date.now();
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });

    it('should handle array with repeated patterns', () => {
      const pattern = [1, 3, 2];
      const nums = Array(50).fill(pattern).flat();
      const result = countHillValley(nums);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('return value properties', () => {
    it('should always return a non-negative integer', () => {
      const testCases = [
        [],
        [1],
        [1, 2],
        [1, 2, 3],
        [3, 2, 1],
        [1, 3, 2],
        [2, 1, 3],
        [1, 1, 1],
        [-5, -2, -7],
        [0, 1, 0]
      ];
      
      testCases.forEach(nums => {
        const result = countHillValley(nums);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(result)).toBe(true);
      });
    });

    it('should return 0 for arrays that cannot have hills or valleys', () => {
      const impossibleCases = [
        [], // Empty
        [5], // Single element
        [1, 2], // Two elements
        [1, 1, 1, 1], // All equal
        [1, 2, 3, 4], // Strictly increasing
        [4, 3, 2, 1]  // Strictly decreasing
      ];

      impossibleCases.forEach(nums => {
        const result = countHillValley(nums);
        expect(result).toBe(0);
      });
    });

    it('should have maximum possible hills/valleys bounded by array length', () => {
      const nums = [1, 5, 2, 6, 3, 7, 4, 8, 1]; // Alternating pattern
      const result = countHillValley(nums);
      // Maximum possible is length - 2 for alternating pattern
      expect(result).toBeLessThanOrEqual(nums.length - 2);
    });
  });

  describe('special pattern recognition', () => {
    it('should handle W-shaped pattern', () => {
      const nums = [3, 1, 2, 1, 3];
      const result = countHillValley(nums);
      expect(result).toBe(3); // valley, hill, valley
    });

    it('should handle M-shaped pattern', () => {
      const nums = [1, 3, 2, 3, 1];
      const result = countHillValley(nums);
      expect(result).toBe(3); // hill, valley, hill
    });

    it('should handle sawtooth pattern', () => {
      const nums = [1, 2, 1, 2, 1, 2, 1];
      const result = countHillValley(nums);
      expect(result).toBe(5); // alternating hills and valleys
    });

    it('should handle inverted sawtooth pattern', () => {
      const nums = [2, 1, 2, 1, 2, 1, 2];
      const result = countHillValley(nums);
      expect(result).toBe(5); // alternating valleys and hills
    });
  });
});
