/**
 * Returns the length of the longest contiguous subarray containing only the maximum number in the input array.
 *
 * @param nums - The array of numbers to search
 * @returns The length of the longest sequence of consecutive maximum values
 */
export function longestSubarray(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let maxOnes = 0;
  let prevOnes = 0;
  let currOnes = 0;
  let hasZero = false;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      currOnes++;
    } else {
      hasZero = true;
      maxOnes = Math.max(maxOnes, prevOnes + currOnes);
      prevOnes = currOnes;
      currOnes = 0;
    }
  }

  // Handle the last sequence
  maxOnes = Math.max(maxOnes, prevOnes + currOnes);

  // If no zeros found, we must delete one element
  if (!hasZero) {
    return nums.length - 1;
  }

  return maxOnes;
}
