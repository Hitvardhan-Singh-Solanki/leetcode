/**
Alice plays the following game, loosely based on the card game "21".

Alice starts with 0 points and draws numbers while she has less than k points. During each draw, she gains an integer number of points randomly from the range [1, maxPts], where maxPts is an integer. Each draw is independent and the outcomes have equal probabilities.

Alice stops drawing numbers when she gets k or more points.

Return the probability that Alice has n or fewer points.

Answers within 10-5 of the actual answer are considered accepted.


Example 1:

Input: n = 10, k = 1, maxPts = 10
Output: 1.00000
Explanation: Alice gets a single card, then stops.
Example 2:

Input: n = 6, k = 1, maxPts = 10
Output: 0.60000
Explanation: Alice gets a single card, then stops.
In 6 out of 10 possibilities, she is at or below 6 points.
Example 3:

Input: n = 21, k = 17, maxPts = 10
Output: 0.73278
 */

import { new21Game } from './new21Game';

describe('new21Game', () => {
  describe('leetcode examples', () => {
    it('should handle example 1 - certain outcome', () => {
      expect(new21Game(10, 1, 10)).toBeCloseTo(1.0, 5);
    });

    it('should handle example 2 - 60% probability', () => {
      expect(new21Game(6, 1, 10)).toBeCloseTo(0.6, 5);
    });

    it('should handle example 3 - complex case', () => {
      expect(new21Game(21, 17, 10)).toBeCloseTo(0.73278, 5);
    });
  });

  describe('edge cases', () => {
    it('should handle k = 0', () => {
      expect(new21Game(10, 0, 10)).toBe(1.0);
    });

    it('should handle impossible cases', () => {
      expect(new21Game(5, 10, 3)).toBe(0.0);
    });

    it('should handle n >= k + maxPts - 1', () => {
      expect(new21Game(30, 10, 5)).toBe(1.0);
    });
  });

  describe('boundary cases', () => {
    it('should handle maxPts = 1', () => {
      expect(new21Game(5, 3, 1)).toBe(1.0);
    });

    it('should handle small probability window', () => {
      expect(new21Game(1, 1, 2)).toBeCloseTo(0.5, 5);
    });
  });
});
