export function rangeSum(
  nums: number[],
  n: number,
  left: number,
  right: number
): number {
  const store = [];
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += nums[j];
      store.push(sum);
    }
  }

  store.sort((a, b) => a - b);

  let rangeSum = 0;
  const mod = 1e9 + 7;

  for (let i = left - 1; i <= right - 1; i++)
    rangeSum = (rangeSum + store[i]) % mod;

  return rangeSum;
}
