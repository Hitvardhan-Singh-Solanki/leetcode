/**
 * Given an integer n, return true if it is a power of four. Otherwise, return false.

An integer n is a power of four, if there exists an integer x such that n == 4x.
Example 1:

Input: n = 16
Output: true
Example 2:

Input: n = 5
Output: false
Example 3:

Input: n = 1
Output: true
 */

import { isPowerOfFour } from './isPowerOfFour';

describe('isPowerOfFour', () => {
  describe('basic powers of four', () => {
    it('should handle known powers of four', () => {
      // 1 -> 0 0 before 1
      expect(isPowerOfFour(1)).toBe(true); // 4^0
      // 100 -> 2 0 before 1
      expect(isPowerOfFour(4)).toBe(true); // 4^1
      // 10000 -> 4 0 before 1
      expect(isPowerOfFour(16)).toBe(true); // 4^2
      // 1000000 -> 6 0 before 1
      expect(isPowerOfFour(64)).toBe(true); // 4^3
      // 100000000 -> 8 0 before 1
      expect(isPowerOfFour(256)).toBe(true); // 4^4
    });
  });

  describe('negative cases', () => {
    it('should return false for non-powers of four', () => {
      expect(isPowerOfFour(0)).toBe(false);
      expect(isPowerOfFour(2)).toBe(false);
      // 0011
      expect(isPowerOfFour(3)).toBe(false);
      // 1000
      expect(isPowerOfFour(8)).toBe(false); // power of 2 but not 4
      expect(isPowerOfFour(32)).toBe(false); // power of 2 but not 4
    });

    it('should handle negative numbers', () => {
      expect(isPowerOfFour(-1)).toBe(false);
      expect(isPowerOfFour(-4)).toBe(false);
      expect(isPowerOfFour(-16)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle large powers of four', () => {
      expect(isPowerOfFour(1048576)).toBe(true); // 4^10
      expect(isPowerOfFour(1048577)).toBe(false); // 4^10 + 1
    });

    it('should handle numbers close to powers of four', () => {
      expect(isPowerOfFour(15)).toBe(false); // close to 16
      expect(isPowerOfFour(17)).toBe(false); // close to 16
      expect(isPowerOfFour(63)).toBe(false); // close to 64
      expect(isPowerOfFour(65)).toBe(false); // close to 64
    });
  });
});
