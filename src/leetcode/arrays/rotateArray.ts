export function rotate(nums: number[], k: number): void {
  if (nums.length === 0) return;
  k = k % nums.length;
  if (k < 0) k += nums.length; // Handle negative k
  let l = 0;
  let r = nums.length - 1;
  reverseArr(nums, l, r);
  l = 0;
  r = k - 1;
  reverseArr(nums, l, r);
  l = k;
  r = nums.length - 1;
  reverseArr(nums, l, r);
}

function reverseArr(nums: number[], l: number, r: number): void {
  while (l < r) {
    const temp = nums[l];
    nums[l] = nums[r];
    nums[r] = temp;
    l++;
    r--;
  }
}
