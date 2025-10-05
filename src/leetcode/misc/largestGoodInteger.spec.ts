/**
 * You are given a string num representing a large integer. An integer is good if it meets the following conditions:
 *
 * It is a substring of num with length 3.
 * It consists of only one unique digit.
 * Return the maximum good integer as a string or an empty string "" if no such integer exists.
 *
 * Note:
 *
 * A substring is a contiguous sequence of characters within a string.
 * There may be leading zeroes in num or a good integer.
 *
 * Example 1:
 *
 * Input: num = "6777133339"
 * Output: "777"
 * Explanation: There are two distinct good integers: "777" and "333".
 * "777" is the largest, so we return "777".
 * Example 2:
 *
 * Input: num = "2300019"
 * Output: "000"
 * Explanation: "000" is the only good integer.
 * Example 3:
 *
 * Input: num = "42352338"
 * Output: ""
 * Explanation: No substring of length 3 consists of only one unique digit. Therefore, there are no good integers.
 *
 * Constraints:
 *
 * 3 <= num.length <= 1000
 * num only consists of digits.
 */

import { largestGoodInteger } from './largestGoodInteger';

describe('largestGoodInteger', () => {
  describe('leetcode examples', () => {
    it('should handle example 1 - multiple good integers', () => {
      expect(largestGoodInteger('6777133339')).toBe('777');
    });

    it('should handle example 2 - leading zeros', () => {
      expect(largestGoodInteger('2300019')).toBe('000');
    });

    it('should handle example 3 - no good integers', () => {
      expect(largestGoodInteger('42352338')).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should handle minimum length string', () => {
      expect(largestGoodInteger('111')).toBe('111');
      expect(largestGoodInteger('123')).toBe('');
    });

    it('should handle all same digits', () => {
      expect(largestGoodInteger('999999')).toBe('999');
    });

    it('should handle multiple same good integers', () => {
      expect(largestGoodInteger('111111')).toBe('111');
    });
  });

  describe('complex cases', () => {
    it('should handle multiple good integers in descending order', () => {
      expect(largestGoodInteger('999888777')).toBe('999');
    });

    it('should handle good integers with zeros', () => {
      expect(largestGoodInteger('1000000')).toBe('000');
    });

    it('should handle overlapping good integers', () => {
      expect(largestGoodInteger('9999')).toBe('999');
    });
  });
});
