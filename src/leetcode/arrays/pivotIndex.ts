export function pivotIndex(nums: number[]): number {
  let rightSum = 0;
  let leftSum = 0;
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    rightSum += nums[i];
  }

  while (index < nums.length) {
    const curr = nums[index];
    rightSum -= curr;
    if (leftSum === rightSum) return index;
    leftSum += curr;

    index++;
  }
  return -1;
}
