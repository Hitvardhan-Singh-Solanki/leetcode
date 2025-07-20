/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

*/

// naive O(n*logn)
export function findKthLargestSort(nums: number[], k: number): number {
  if (k > nums.length) return -1;
  const index = nums.length - k;
  nums.sort((a, b) => a - b);
  return nums[index];
}

// // O(n)
// export function findKthLargest(nums: number[], k: number): number {}
