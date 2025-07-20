import { longestPalindrome } from './longestPalindromets';
describe('longestPalindrome', () => {
  it('should return the correct length for the provided array of words', () => {
    const testCases = [
      { words: ['lc', 'cl', 'gg'], expected: 6 },
      { words: ['ab', 'ty', 'yt', 'lc', 'cl', 'ab'], expected: 8 },
      { words: ['cc', 'll', 'xx'], expected: 2 },
      {
        words: [
          'dd',
          'aa',
          'bb',
          'dd',
          'aa',
          'dd',
          'bb',
          'dd',
          'aa',
          'cc',
          'bb',
          'cc',
          'dd',
          'cc',
        ],
        expected: 22,
      },
    ];
    for (let { words, expected } of testCases) {
      const actual = longestPalindrome(words);
      expect(actual).toBe(expected);
    }
  });
});
