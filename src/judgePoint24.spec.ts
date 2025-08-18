/**
You are given an integer array cards of length 4. You have four cards, each containing a number in the range [1, 9]. You should arrange the numbers on these cards in a mathematical expression using the operators ['+', '-', '*', '/'] and the parentheses '(' and ')' to get the value 24.

You are restricted with the following rules:

The division operator '/' represents real division, not integer division.
For example, 4 / (1 - 2 / 3) = 4 / (1 / 3) = 12.
Every operation done is between two numbers. In particular, we cannot use '-' as a unary operator.
For example, if cards = [1, 1, 1, 1], the expression "-1 - 1 - 1 - 1" is not allowed.
You cannot concatenate numbers together
For example, if cards = [1, 2, 1, 2], the expression "12 + 12" is not valid.
Return true if you can get such expression that evaluates to 24, and false otherwise.

 

Example 1:

Input: cards = [4,1,8,7]
Output: true
Explanation: (8-4) * (7-1) = 24
Example 2:

Input: cards = [1,2,1,2]
Output: false
 

Constraints:

cards.length == 4
1 <= cards[i] <= 9
 */

import { judgePoint24 } from './judgePoint24';

describe('judgePoint24', () => {
  describe('leetcode examples', () => {
    it('should handle example 1 - possible solution', () => {
      expect(judgePoint24([4, 1, 8, 7])).toBe(true); // (8-4) * (7-1) = 24
    });

    it('should handle example 2 - impossible case', () => {
      expect(judgePoint24([1, 2, 1, 2])).toBe(false);
    });
  });

  describe('basic arithmetic cases', () => {
    it('should handle simple multiplication', () => {
      expect(judgePoint24([3, 8, 1, 1])).toBe(true); // 3 * 8 = 24
    });

    it('should handle division', () => {
      expect(judgePoint24([4, 1, 8, 2])).toBe(true); // 8 * 4 / (2-1) = 24
    });

    it('should handle mixed operations', () => {
      expect(judgePoint24([6, 6, 6, 6])).toBe(true); // 6 * (6 - 6/6) = 24
    });
  });

  describe('edge cases', () => {
    it('should handle numbers that sum to 24', () => {
      expect(judgePoint24([6, 6, 6, 6])).toBe(true);
    });

    it('should handle single digit multiplication to 24', () => {
      expect(judgePoint24([3, 3, 8, 8])).toBe(true); // 3 * 8 = 24
    });

    it('should handle impossible cases', () => {
      expect(judgePoint24([1, 1, 1, 1])).toBe(false);
      expect(judgePoint24([9, 9, 9, 9])).toBe(false);
    });
  });

  describe('complex cases', () => {
    it('should handle nested expressions', () => {
      expect(judgePoint24([4, 7, 8, 8])).toBe(true); // 8/(4-7/8) = 24
    });

    it('should handle multiple valid solutions', () => {
      expect(judgePoint24([4, 3, 8, 7])).toBe(true); // Multiple ways to get 24
    });

    it('should handle operations requiring specific order', () => {
      expect(judgePoint24([1, 3, 4, 6])).toBe(true); // (1+3)*(6-4) = 24
    });
  });
});
