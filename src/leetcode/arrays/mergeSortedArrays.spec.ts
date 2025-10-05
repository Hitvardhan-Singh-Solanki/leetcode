import { merge } from './mergeSortedArrays';

describe('merge', () => {
  describe('Basic functionality', () => {
    it('should merge two sorted arrays', () => {
      const nums1 = [1, 2, 3, 0, 0, 0];
      merge(nums1, 3, [2, 5, 6], 3);
      expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
    });

    it('should merge when first array is smaller', () => {
      const nums1 = [1, 0, 0, 0];
      merge(nums1, 1, [2, 3, 4], 3);
      expect(nums1).toEqual([1, 2, 3, 4]);
    });

    it('should merge when second array is smaller', () => {
      const nums1 = [4, 5, 6, 0, 0];
      merge(nums1, 3, [1, 2], 2);
      expect(nums1).toEqual([1, 2, 4, 5, 6]);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty second array', () => {
      const nums1 = [1, 2, 3];
      merge(nums1, 3, [], 0);
      expect(nums1).toEqual([1, 2, 3]);
    });

    it('should handle empty first array', () => {
      const nums1 = [0];
      merge(nums1, 0, [1], 1);
      expect(nums1).toEqual([1]);
    });

    it('should handle single element in each', () => {
      const nums1 = [1, 0];
      merge(nums1, 1, [2], 1);
      expect(nums1).toEqual([1, 2]);
    });

    it('should handle single element merge with smaller second', () => {
      const nums1 = [2, 0];
      merge(nums1, 1, [1], 1);
      expect(nums1).toEqual([1, 2]);
    });
  });

  describe('Complex cases', () => {
    it('should handle arrays with duplicates', () => {
      const nums1 = [1, 2, 2, 0, 0, 0];
      merge(nums1, 3, [2, 2, 3], 3);
      expect(nums1).toEqual([1, 2, 2, 2, 2, 3]);
    });

    it('should handle all elements from nums2 being smaller', () => {
      const nums1 = [4, 5, 6, 0, 0, 0];
      merge(nums1, 3, [1, 2, 3], 3);
      expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle all elements from nums1 being smaller', () => {
      const nums1 = [1, 2, 3, 0, 0, 0];
      merge(nums1, 3, [4, 5, 6], 3);
      expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle interleaved elements', () => {
      const nums1 = [1, 3, 5, 0, 0, 0];
      merge(nums1, 3, [2, 4, 6], 3);
      expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      const nums1 = [1, 2, 3, 0, 0, 0];
      merge(nums1, 3, [2, 5, 6], 3);
      expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);

      const nums2 = [1];
      merge(nums2, 1, [], 0);
      expect(nums2).toEqual([1]);

      const nums3 = [0];
      merge(nums3, 0, [1], 1);
      expect(nums3).toEqual([1]);
    });
  });
});
