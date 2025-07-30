export function longestSubarray(nums: number[]): number {
  let maxNumber = Math.max(...nums);
  let count = 0;
  let maxCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === maxNumber) count++;
    else count = 0;
    maxCount = Math.max(maxCount, count);
  }

  return maxCount;
}
