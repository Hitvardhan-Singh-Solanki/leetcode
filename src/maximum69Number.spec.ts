import { maximum69Number } from './maximum69Number';

describe('maximum69Number', () => {
  describe('leetcode examples', () => {
    it('should handle example 1 - multiple possibilities', () => {
      expect(maximum69Number(9669)).toBe(9969);
    });

    it('should handle example 2 - single change', () => {
      expect(maximum69Number(9996)).toBe(9999);
    });

    it('should handle example 3 - no change needed', () => {
      expect(maximum69Number(9999)).toBe(9999);
    });
  });

  describe('edge cases', () => {
    it('should handle single digit numbers', () => {
      expect(maximum69Number(6)).toBe(9);
      expect(maximum69Number(9)).toBe(9);
    });

    it('should handle all sixes', () => {
      expect(maximum69Number(666)).toBe(966);
    });

    it('should handle alternating digits', () => {
      expect(maximum69Number(6969)).toBe(9969);
    });
  });

  describe('complex cases', () => {
    it('should handle larger numbers', () => {
      expect(maximum69Number(669966)).toBe(969966);
    });

    it('should handle when first digit is 6', () => {
      expect(maximum69Number(6999)).toBe(9999);
    });

    it('should handle when last digit is 6', () => {
      expect(maximum69Number(9996)).toBe(9999);
    });
  });
});
