export function longestSubarray(nums: number[]): number {
  let maxNumber = nums.reduce((acc, val) => {
    return Math.max(acc, val);
  }, -Infinity);

  let count = 0;
  let maxCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === maxNumber) {
      count++;
      maxCount = Math.max(maxCount, count);
    } else count = 0;
  }

  return maxCount;
}
