export function minDifference(nums: number[]): number {
  if (nums.length <= 4) return 0;
  let minDiff = Infinity;
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = nums.length - 4;
  while (left < 4) {
    minDiff = Math.min(minDiff, nums[right] - nums[left]);
    left++;
    right++;
  }
  return minDiff;
}
