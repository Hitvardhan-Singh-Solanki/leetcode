export function minimumSum(num: number): number {
  const a = num
    .toString()
    .split('')
    .map((e) => +e)
    .sort((a, b) => a - b);

  return a[0] * 10 + a[2] + (a[1] * 10 + a[3]);
}
