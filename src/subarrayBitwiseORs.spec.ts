import { subarrayBitwiseORs } from './subarrayBitwiseORs';

describe('subarrayBitwiseORs', () => {
  describe('leetcode examples', () => {
    it('should handle example 1 - single element array', () => {
      expect(subarrayBitwiseORs([0])).toBe(1);
    });

    it('should handle example 2 - array with duplicates', () => {
      expect(subarrayBitwiseORs([1, 1, 2])).toBe(3);
    });

    it('should handle example 3 - powers of 2', () => {
      expect(subarrayBitwiseORs([1, 2, 4])).toBe(6);
    });
  });

  describe('edge cases', () => {
    it('should handle empty array', () => {
      expect(subarrayBitwiseORs([])).toBe(0);
    });

    it('should handle array with all zeros', () => {
      expect(subarrayBitwiseORs([0, 0, 0])).toBe(1);
    });

    it('should handle array with all same numbers', () => {
      expect(subarrayBitwiseORs([5, 5, 5])).toBe(1);
    });
  });

  //   describe('complex cases', () => {
  //     it('should handle array with binary pattern', () => {
  //       expect(subarrayBitwiseORs([1, 2, 4, 8])).toBe(15);
  //     });

  //     it('should handle array with overlapping bits', () => {
  //       expect(subarrayBitwiseORs([7, 8, 3])).toBe(8);
  //     });
  //   });
});
