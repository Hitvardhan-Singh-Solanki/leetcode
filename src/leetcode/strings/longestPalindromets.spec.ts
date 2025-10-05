import { longestPalindrome } from './longestPalindromets';

describe('longestPalindrome', () => {
  describe('Basic functionality', () => {
    it('should find longest palindrome from word pairs', () => {
      expect(longestPalindrome(['lc', 'cl', 'gg'])).toBe(6);
      expect(longestPalindrome(['ab', 'ty', 'yt', 'lc', 'cl', 'ab'])).toBe(8);
    });

    it('should handle single pair', () => {
      expect(longestPalindrome(['ab', 'ba'])).toBe(4);
    });

    it('should handle same letters', () => {
      expect(longestPalindrome(['aa', 'bb'])).toBe(2);
      expect(longestPalindrome(['aa', 'aa'])).toBe(4);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty array', () => {
      expect(longestPalindrome([])).toBe(0);
    });

    it('should handle single word', () => {
      expect(longestPalindrome(['ab'])).toBe(0);
      expect(longestPalindrome(['aa'])).toBe(2);
    });

    it('should handle no matching pairs', () => {
      expect(longestPalindrome(['ab', 'cd', 'ef'])).toBe(0);
    });
  });

  describe('Complex cases', () => {
    it('should handle multiple same-letter words', () => {
      expect(longestPalindrome(['aa', 'bb', 'cc', 'dd', 'ee'])).toBe(2);
    });

    it('should handle mix of pairs and same letters', () => {
      expect(longestPalindrome(['aa', 'ab', 'ba', 'bb'])).toBe(6);
    });

    it('should handle many pairs', () => {
      expect(longestPalindrome(['ab', 'ba', 'cd', 'dc', 'ef', 'fe'])).toBe(12);
    });

    it('should handle center palindrome with pairs', () => {
      expect(longestPalindrome(['ll', 'ab', 'ba', 'll'])).toBe(8);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      expect(longestPalindrome(['lc', 'cl', 'gg'])).toBe(6);
      expect(longestPalindrome(['ab', 'ty', 'yt', 'lc', 'cl', 'ab'])).toBe(8);
      expect(longestPalindrome(['cc', 'll', 'xx'])).toBe(2);
    });
  });
});
