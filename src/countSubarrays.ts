export function countSubarrays(nums: number[], k: number): number {
  const n = nums.length;
  let res = 0;
  let total = 0;
  let i = 0;
  for (let j = 0; j < n; j++) {
    total += nums[j];
    const length = j - i + 1;
    const currentProduct = total * length;
    while (i <= j && currentProduct >= k) {
      total -= nums[i];
      i++;
    }
    res += length;
  }
  return res;
}
