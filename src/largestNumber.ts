export function largestNumber(nums: number[]): string {
  nums.sort((a, b) => (`${a}${b}` < `${b}${a}` ? 1 : -1));
  if (nums[0] === 0) return '0';
  return nums.join('');
}
