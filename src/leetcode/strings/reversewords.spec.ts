import { reverseWords } from './reversewords';

describe('reverseWords', () => {
  describe('Basic functionality', () => {
    it('should reverse words in a sentence', () => {
      expect(reverseWords('the sky is blue')).toBe('blue is sky the');
      expect(reverseWords('hello world')).toBe('world hello');
    });

    it('should handle single word', () => {
      expect(reverseWords('hello')).toBe('hello');
    });

    it('should handle two words', () => {
      expect(reverseWords('hello world')).toBe('world hello');
    });
  });

  describe('Edge cases with spaces', () => {
    it('should handle leading spaces', () => {
      expect(reverseWords('  hello world')).toBe('world hello');
    });

    it('should handle trailing spaces', () => {
      expect(reverseWords('hello world  ')).toBe('world hello');
    });

    it('should handle multiple spaces between words', () => {
      expect(reverseWords('a good   example')).toBe('example good a');
    });

    it('should handle multiple spaces everywhere', () => {
      expect(reverseWords('  hello   world  ')).toBe('world hello');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      expect(reverseWords('')).toBe('');
    });

    it('should handle string with only spaces', () => {
      expect(reverseWords('   ')).toBe('');
    });

    it('should handle single character', () => {
      expect(reverseWords('a')).toBe('a');
    });
  });

  describe('Complex cases', () => {
    it('should handle long sentences', () => {
      expect(reverseWords('The quick brown fox jumps over the lazy dog')).toBe(
        'dog lazy the over jumps fox brown quick The'
      );
    });

    it('should handle sentence with punctuation', () => {
      expect(reverseWords('hello, world!')).toBe('world! hello,');
    });
  });
});
