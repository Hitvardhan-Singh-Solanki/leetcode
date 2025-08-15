import { longestSubarray } from './longestSubarray';

describe('longestSubarray', () => {
  it('should handle all ones', () => {
    expect(longestSubarray([1, 1, 1])).toBe(2);
  });

  it('should handle all zeros', () => {
    expect(longestSubarray([0, 0, 0])).toBe(0);
  });

  it('should handle alternating ones and zeros', () => {
    expect(longestSubarray([1, 0, 1, 0, 1])).toBe(2);
  });

  it('should handle complex case', () => {
    expect(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])).toBe(5);
  });

  it('should handle empty array', () => {
    expect(longestSubarray([])).toBe(0);
  });

  it('should handle single element', () => {
    expect(longestSubarray([1])).toBe(0);
    expect(longestSubarray([0])).toBe(0);
  });

  it('should handle case with multiple possible deletions', () => {
    expect(longestSubarray([1, 1, 1, 0, 0, 1, 1, 1, 1])).toBe(4);
  });
});
