import { canBeTypedWords } from './canBeTypedWords';

describe('canBeTypedWords', () => {
  // Basic examples from problem statement
  it('should return the correct count for simple examples', () => {
    expect(canBeTypedWords('hello world', 'ad')).toBe(1);
    expect(canBeTypedWords('leet code', 'lt')).toBe(1);
    expect(canBeTypedWords('leet code', 'e')).toBe(0);
  });

  // No broken letters => all words should be typeable
  it('should return total words when no letters are broken', () => {
    expect(canBeTypedWords('the quick brown fox', '')).toBe(4);
    expect(canBeTypedWords('a', '')).toBe(1);
  });

  // All letters broken => zero words should be typeable
  it('should return 0 when all letters are broken', () => {
    expect(canBeTypedWords('a b c', 'abc')).toBe(0);
    expect(canBeTypedWords('word', 'abcdefghijklmnopqrstuvwxyz')).toBe(0);
  });

  // Mixed cases with multiple broken letters
  it('should handle multiple broken letters correctly', () => {
    expect(canBeTypedWords('the quick brown fox', 'aeiou')).toBe(0); // all words have vowels
    expect(canBeTypedWords('gym myth fly', 'aeiou')).toBe(3); // words with no vowels
  });

  // Repeated letters in words shouldn't matter
  it('should handle words with repeated letters correctly', () => {
    expect(canBeTypedWords('letter better setter', 't')).toBe(0);
    expect(canBeTypedWords('letter better setter', 'l')).toBe(0);
    expect(canBeTypedWords('letter better setter', 'x')).toBe(3);
  });

  // Single-letter words
  it('should handle single-letter words correctly', () => {
    expect(canBeTypedWords('a b c d e', 'abc')).toBe(2); // only d and e are typeable
    expect(canBeTypedWords('a b c', '')).toBe(3); // all words typeable
  });

  // Large input edge case
  it('should handle large input efficiently', () => {
    const text = Array(1000).fill('hello').join(' ');
    expect(canBeTypedWords(text, 'z')).toBe(1000); // 'z' not in any word
    expect(canBeTypedWords(text, 'h')).toBe(0); // 'h' breaks all words
  });

  // No words in text (not really possible due to constraints, but for safety)
  it('should handle empty text gracefully', () => {
    expect(canBeTypedWords('', 'a')).toBe(0);
  });
});
