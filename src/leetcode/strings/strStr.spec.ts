import { strStr, strStrKMP } from './strStr';

describe('strStr', () => {
  describe('Basic functionality', () => {
    it('should find needle in haystack', () => {
      expect(strStr('hello', 'll')).toBe(2);
      expect(strStr('sadbutsad', 'sad')).toBe(0);
    });

    it('should return -1 when needle not found', () => {
      expect(strStr('leetcode', 'leeto')).toBe(-1);
      expect(strStr('hello', 'world')).toBe(-1);
    });

    it('should handle empty needle', () => {
      expect(strStr('hello', '')).toBe(0);
      expect(strStr('', '')).toBe(0);
    });

    it('should handle empty haystack', () => {
      expect(strStr('', 'a')).toBe(-1);
    });
  });

  describe('Edge cases', () => {
    it('should handle single character needle', () => {
      expect(strStr('hello', 'e')).toBe(1);
      expect(strStr('hello', 'o')).toBe(4);
      expect(strStr('hello', 'x')).toBe(-1);
    });

    it('should handle needle longer than haystack', () => {
      expect(strStr('hi', 'hello')).toBe(-1);
    });

    it('should handle identical strings', () => {
      expect(strStr('hello', 'hello')).toBe(0);
    });

    it('should find first occurrence', () => {
      expect(strStr('hellohello', 'll')).toBe(2);
    });

    it('should handle repeated characters', () => {
      expect(strStr('aaaaa', 'aa')).toBe(0);
      expect(strStr('ababab', 'ab')).toBe(0);
    });
  });

  describe('Complex cases', () => {
    it('should handle partial matches', () => {
      expect(strStr('mississippi', 'issip')).toBe(4);
      expect(strStr('mississippi', 'issi')).toBe(1);
    });

    it('should handle overlapping patterns', () => {
      expect(strStr('ababab', 'abab')).toBe(0);
    });
  });
});

describe('strStrKMP', () => {
  describe('Basic functionality', () => {
    it('should find needle in haystack', () => {
      expect(strStrKMP('hello', 'll')).toBe(2);
      expect(strStrKMP('sadbutsad', 'sad')).toBe(0);
    });

    it('should return -1 when needle not found', () => {
      expect(strStrKMP('leetcode', 'leeto')).toBe(-1);
      expect(strStrKMP('hello', 'world')).toBe(-1);
    });

    it('should handle empty needle', () => {
      expect(strStrKMP('hello', '')).toBe(0);
      expect(strStrKMP('', '')).toBe(0);
    });

    it('should handle empty haystack', () => {
      expect(strStrKMP('', 'a')).toBe(-1);
    });
  });

  describe('Edge cases', () => {
    it('should handle single character needle', () => {
      expect(strStrKMP('hello', 'e')).toBe(1);
      expect(strStrKMP('hello', 'o')).toBe(4);
      expect(strStrKMP('hello', 'x')).toBe(-1);
    });

    it('should handle needle longer than haystack', () => {
      expect(strStrKMP('hi', 'hello')).toBe(-1);
    });

    it('should handle identical strings', () => {
      expect(strStrKMP('hello', 'hello')).toBe(0);
    });

    it('should find first occurrence', () => {
      expect(strStrKMP('hellohello', 'll')).toBe(2);
    });
  });

  describe('Complex cases', () => {
    it('should handle partial matches', () => {
      expect(strStrKMP('mississippi', 'issip')).toBe(4);
      expect(strStrKMP('mississippi', 'issi')).toBe(1);
    });

    it('should handle overlapping patterns', () => {
      expect(strStrKMP('ababab', 'abab')).toBe(0);
    });

    it('should handle repeated characters', () => {
      expect(strStrKMP('aaaaa', 'aa')).toBe(0);
      expect(strStrKMP('ababab', 'ab')).toBe(0);
    });
  });
});
