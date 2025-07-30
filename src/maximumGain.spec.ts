import { maximumGain } from './maximumGains';

describe('maximumGain', () => {
  describe('basic functionality', () => {
    it('should return 19 for the given example case', () => {
      const s = 'cdbcbbaaabab';
      const x = 4;
      const y = 5;
      const result = maximumGain(s, x, y);
      expect(result).toBe(19);
    });

    it('should handle simple ab pattern with x > y', () => {
      const s = 'ab';
      const x = 10;
      const y = 5;
      const result = maximumGain(s, x, y);
      expect(result).toBe(10);
    });

    it('should handle simple ba pattern with y > x', () => {
      const s = 'ba';
      const x = 5;
      const y = 10;
      const result = maximumGain(s, x, y);
      expect(result).toBe(10);
    });

    it('should prioritize higher value pairs when y > x', () => {
      const s = 'aabbba';
      const x = 3;
      const y = 4;
      const result = maximumGain(s, x, y);
      // Should get 2 "ba" pairs (8 points) + 1 "ab" pair (3 points) = 11 points
      expect(result).toBe(11);
    });

    it('should prioritize higher value pairs when x > y', () => {
      const s = 'aabbba';
      const x = 5;
      const y = 3;
      const result = maximumGain(s, x, y);
      // Should get 2 "ab" pairs (10 points) + 1 "ba" pair (3 points) = 13 points
      expect(result).toBe(13);
    });
  });

  describe('edge cases', () => {
    it('should return 0 for empty string', () => {
      const result = maximumGain('', 5, 3);
      expect(result).toBe(0);
    });

    it('should return 0 for single character', () => {
      const result = maximumGain('a', 5, 3);
      expect(result).toBe(0);
    });

    it('should return 0 when no ab or ba pairs exist', () => {
      const result = maximumGain('ccccdddd', 5, 3);
      expect(result).toBe(0);
    });

    it('should handle string with only a characters', () => {
      const result = maximumGain('aaaa', 5, 3);
      expect(result).toBe(0);
    });

    it('should handle string with only b characters', () => {
      const result = maximumGain('bbbb', 5, 3);
      expect(result).toBe(0);
    });

    it('should handle alternating pattern that cannot form pairs', () => {
      const result = maximumGain('abcabc', 5, 3);
      expect(result).toBe(0);
    });

    it('should handle string with no adjacent a and b', () => {
      const result = maximumGain('acbdacbd', 5, 3);
      expect(result).toBe(0);
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple consecutive ab patterns', () => {
      const s = 'ababab';
      const x = 2;
      const y = 1;
      const result = maximumGain(s, x, y);
      expect(result).toBe(6); // 3 "ab" pairs with value 2 each
    });

    it('should handle multiple consecutive ba patterns', () => {
      const s = 'bababa';
      const x = 1;
      const y = 3;
      const result = maximumGain(s, x, y);
      expect(result).toBe(9); // 3 "ba" pairs with value 3 each
    });

    it('should handle mixed patterns with other characters', () => {
      const s = 'cababdba';
      const x = 2;
      const y = 3;
      const result = maximumGain(s, x, y);
      // Should find "ba" pairs first (higher value), then "ab" pairs
      expect(result).toBe(8); // 2 "ba" pairs (6 points) + 1 "ab" pair (2 points)
    });

    it('should optimize for maximum gain with overlapping opportunities', () => {
      const s = 'aabbaabb';
      const x = 1;
      const y = 10;
      const result = maximumGain(s, x, y);
      // Should prioritize ba pairs (y=10) over ab pairs (x=1)
      expect(result).toBe(40); // 4 "ba" pairs with value 10 each
    });

    it('should handle long string with many pairs', () => {
      const s = 'a'.repeat(1000) + 'b'.repeat(1000);
      const x = 1;
      const y = 1;
      const result = maximumGain(s, x, y);
      expect(result).toBe(1000);
    });

    it('should handle nested ab and ba patterns', () => {
      const s = 'abba';
      const x = 2;
      const y = 3;
      const result = maximumGain(s, x, y);
      // Should get 1 "ba" pair (3 points) + 1 "ab" pair (2 points) = 5 points
      expect(result).toBe(5);
    });
  });

  describe('parameter variations', () => {
    it('should work when x equals y', () => {
      const s = 'abba';
      const x = 5;
      const y = 5;
      const result = maximumGain(s, x, y);
      expect(result).toBe(10); // 2 pairs worth 5 each
    });

    it('should handle zero values for x', () => {
      const s = 'abba';
      const x = 0;
      const y = 5;
      const result = maximumGain(s, x, y);
      expect(result).toBe(5); // Only ba pairs have value
    });

    it('should handle zero values for y', () => {
      const s = 'abba';
      const x = 5;
      const y = 0;
      const result = maximumGain(s, x, y);
      expect(result).toBe(5); // Only ab pairs have value
    });

    it('should handle both zero values', () => {
      const s = 'abba';
      const x = 0;
      const y = 0;
      const result = maximumGain(s, x, y);
      expect(result).toBe(0);
    });

    it('should handle large values', () => {
      const s = 'ab';
      const x = 1000000;
      const y = 999999;
      const result = maximumGain(s, x, y);
      expect(result).toBe(1000000);
    });

    it('should handle negative values gracefully', () => {
      const s = 'ab';
      const x = -5;
      const y = 10;
      const result = maximumGain(s, x, y);
      // Should only count positive value pairs
      expect(result).toBe(0);
    });
  });

  describe('greedy algorithm verification', () => {
    it('should make optimal choices for overlapping patterns', () => {
      const s = 'aaabbbaaabbb';
      const x = 1;
      const y = 2;
      const result = maximumGain(s, x, y);
      // Should prioritize higher value pairs first
      expect(result).toBe(12); // 6 "ba" pairs with value 2 each
    });

    it('should handle nested patterns correctly', () => {
      const s = 'aabbbaaa';
      const x = 3;
      const y = 4;
      const result = maximumGain(s, x, y);
      // Should get "ba" pairs first, then remaining "ab" pairs
      expect(result).toBe(11); // 2 "ba" pairs (8) + 1 "ab" pair (3)
    });

    it('should verify optimal solution for complex case', () => {
      const s = 'aabbbgcabxycbabc';
      const x = 4;
      const y = 5;
      const result = maximumGain(s, x, y);
      // Manual calculation: prioritize "ba" pairs first
      expect(result).toBe(14); // Should find optimal arrangement
    });

    it('should handle alternating a and b with interruptions', () => {
      const s = 'axbxaxbx';
      const x = 3;
      const y = 2;
      const result = maximumGain(s, x, y);
      expect(result).toBe(0); // No adjacent pairs possible
    });
  });

  describe('performance considerations', () => {
    it('should handle moderately long strings efficiently', () => {
      const s = 'ab'.repeat(5000);
      const x = 1;
      const y = 1;
      const start = Date.now();
      const result = maximumGain(s, x, y);
      const end = Date.now();
      expect(result).toBe(5000);
      expect(end - start).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should handle strings with no pairs efficiently', () => {
      const s = 'c'.repeat(10000);
      const x = 1;
      const y = 1;
      const start = Date.now();
      const result = maximumGain(s, x, y);
      const end = Date.now();
      expect(result).toBe(0);
      expect(end - start).toBeLessThan(100); // Should be very fast
    });
  });

  describe('stack behavior verification', () => {
    it('should correctly use stack for pattern matching', () => {
      const s = 'aabbc';
      const x = 1;
      const y = 2;
      const result = maximumGain(s, x, y);
      // Should get 1 "ba" pair (2 points) + 1 "ab" pair (1 point) = 3 points
      expect(result).toBe(3);
    });

    it('should handle deep nesting', () => {
      const s = 'aaabbbaaa';
      const x = 1;
      const y = 3;
      const result = maximumGain(s, x, y);
      // Should process all possible "ba" pairs first, then "ab" pairs
      expect(result).toBe(12); // 3 "ba" pairs (9) + 3 "ab" pairs (3)
    });

    it('should reset string state between passes', () => {
      const s = 'aabbbaa';
      const x = 2;
      const y = 1;
      const result = maximumGain(s, x, y);
      // First pass removes "ab" pairs, second pass removes "ba" pairs from remainder
      expect(result).toBe(8); // 3 "ab" pairs (6) + 2 "ba" pairs (2)
    });
  });
});
