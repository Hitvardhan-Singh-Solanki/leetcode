export function subsetXORSum(nums: number[]): number {
  return backtrack(0, 0, nums);
}

function backtrack(index: number, currentXor: number, nums: number[]): number {
  if (index === nums.length) return currentXor;
  const withElement = backtrack(index + 1, currentXor ^ nums[index], nums);
  const withoutElement = backtrack(index + 1, currentXor, nums);
  return withElement + withoutElement;
}
