import { pivotIndex } from './pivotIndex';

describe('pivotIndex', () => {
  describe('Basic functionality', () => {
    it('should find pivot index', () => {
      expect(pivotIndex([1, 7, 3, 6, 5, 6])).toBe(3);
      expect(pivotIndex([1, 2, 3])).toBe(-1);
      expect(pivotIndex([2, 1, -1])).toBe(0);
    });

    it('should handle pivot at start', () => {
      expect(pivotIndex([2, 1, -1])).toBe(0);
    });

    it('should handle pivot at end', () => {
      expect(pivotIndex([-1, -1, -1, -1, -1, 0])).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle single element', () => {
      expect(pivotIndex([1])).toBe(0);
      expect(pivotIndex([0])).toBe(0);
    });

    it('should handle two elements', () => {
      expect(pivotIndex([1, 1])).toBe(-1);
      expect(pivotIndex([1, 0])).toBe(0);
    });

    it('should handle all zeros', () => {
      expect(pivotIndex([0, 0, 0])).toBe(0);
    });

    it('should return -1 when no pivot exists', () => {
      expect(pivotIndex([1, 2, 3, 4])).toBe(-1);
    });
  });

  describe('Complex cases', () => {
    it('should handle arrays with negative numbers', () => {
      expect(pivotIndex([-1, -1, -1, -1, -1, 0])).toBe(2);
      expect(pivotIndex([2, -1, 1])).toBe(0);
    });

    it('should handle arrays with zeros', () => {
      expect(pivotIndex([1, 1, 1, 0, 0, 0])).toBe(1);
    });

    it('should handle large arrays', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(pivotIndex(arr)).toBe(-1);
    });

    it('should find first valid pivot', () => {
      expect(pivotIndex([1, 7, 3, 6, 5, 6])).toBe(3);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      expect(pivotIndex([1, 7, 3, 6, 5, 6])).toBe(3);
      expect(pivotIndex([1, 2, 3])).toBe(-1);
      expect(pivotIndex([2, 1, -1])).toBe(0);
    });
  });
});
