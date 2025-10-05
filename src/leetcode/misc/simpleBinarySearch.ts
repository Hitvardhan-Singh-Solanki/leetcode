export function search(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    const mid = start + Math.floor((end - start + 1) / 2);
    console.log({ start, mid, end });
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) end = mid - 1;
    else start = mid;
  }
  return -1;
}
