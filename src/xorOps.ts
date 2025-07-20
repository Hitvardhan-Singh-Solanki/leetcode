// nums[i] = start + 2 * i;

export function xorOperation(n: number, start: number): number {
  let res = start + 2 * 0;
  for (let i = 1; i < n; i++) res ^= start + 2 * i;
  return res;
}
