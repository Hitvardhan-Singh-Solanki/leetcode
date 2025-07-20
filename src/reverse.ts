export function reverseNew(x: number): number {
  let isNegative = false;
  if (x < 0) {
    isNegative = true;
    x = x * -1;
  }
  const s = '' + x;
  const res = isNegative
    ? +s.split('').reverse().join('') * -1
    : +s.split('').reverse().join('');
  if (res > 2 ** 31 - 1 || -1 * 2 ** 31 >= res) return 0;
  return res;
}
