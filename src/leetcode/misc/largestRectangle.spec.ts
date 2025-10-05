import { maximalRectangle } from './largestRectangle';

describe('maximalRectangle', () => {
  describe('Basic cases', () => {
    it('should handle empty matrix', () => {
      expect(maximalRectangle([])).toBe(0);
      expect(maximalRectangle([[]])).toBe(0);
    });

    it('should handle single cell matrix', () => {
      expect(maximalRectangle([['1']])).toBe(1);
      expect(maximalRectangle([['0']])).toBe(0);
    });

    it('should handle 2x2 matrix', () => {
      expect(
        maximalRectangle([
          ['1', '0'],
          ['1', '0'],
        ])
      ).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle all zeros', () => {
      expect(
        maximalRectangle([
          ['0', '0'],
          ['0', '0'],
        ])
      ).toBe(0);
    });

    it('should handle all ones', () => {
      expect(
        maximalRectangle([
          ['1', '1'],
          ['1', '1'],
        ])
      ).toBe(4);
    });

    it('should handle single row', () => {
      expect(maximalRectangle([['1', '0', '1']])).toBe(1);
    });

    it('should handle single column', () => {
      expect(maximalRectangle([['1'], ['0'], ['1']])).toBe(1);
    });
  });

  describe('Complex cases', () => {
    it('should handle mixed matrix', () => {
      expect(
        maximalRectangle([
          ['1', '0', '1', '0', '0'],
          ['1', '0', '1', '1', '1'],
          ['1', '1', '1', '1', '1'],
          ['1', '0', '0', '1', '0'],
        ])
      ).toBe(6);
    });

    it('should handle larger matrix', () => {
      expect(
        maximalRectangle([
          ['1', '1', '1', '1', '1'],
          ['1', '0', '0', '0', '1'],
          ['1', '1', '1', '1', '1'],
        ])
      ).toBe(5);
    });
  });

  describe('Performance cases', () => {
    it('should handle large matrix', () => {
      const largeMatrix = Array(100)
        .fill(null)
        .map(() => Array(100).fill('1'));
      const result = maximalRectangle(largeMatrix);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
});
