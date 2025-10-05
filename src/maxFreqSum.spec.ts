import { maxFreqSum } from './maxFreqSum';

describe('maxFreqSum', () => {
  describe('leetcode examples', () => {
    it('should handle example 1 - mixed vowels and consonants', () => {
      expect(maxFreqSum('successes')).toBe(6); // max vowel 'e'(2) + max consonant 's'(4)
    });

    it('should handle example 2 - only vowels', () => {
      expect(maxFreqSum('aeiaeia')).toBe(3); // max vowel 'a'(3) + no consonants(0)
    });
  });

  describe('edge cases', () => {
    it('should handle single character strings', () => {
      expect(maxFreqSum('a')).toBe(1); // vowel only
      expect(maxFreqSum('z')).toBe(1); // consonant only
    });

    it('should handle strings with only vowels', () => {
      expect(maxFreqSum('aeiou')).toBe(1); // all different vowels
      expect(maxFreqSum('aaa')).toBe(3); // repeated vowel
    });

    it('should handle strings with only consonants', () => {
      expect(maxFreqSum('bcd')).toBe(1); // all different consonants
      expect(maxFreqSum('zzz')).toBe(3); // repeated consonant
    });
  });

  describe('complex cases', () => {
    it('should handle equal frequencies', () => {
      expect(maxFreqSum('aabbcc')).toBe(4); // vowel 'a'(2) + consonant 'b'/'c'(2)
    });

    it('should handle multiple max frequencies', () => {
      expect(maxFreqSum('aabbzzcc')).toBe(4); // any vowel(2) + any consonant(2)
    });

    it('should handle all letters with same frequency', () => {
      expect(maxFreqSum('abcde')).toBe(2); // one vowel(1) + one consonant(1)
    });
  });
});
