export function myAtoi(s: string): number {
  let i = 0;
  while (s[i] === ' ') i++;
  const sign = (s[i] === '+' || s[i] === '-') && s[i++] === '-' ? -1 : 1;
  let n = 0;
  while (47 < s.charCodeAt(i) && s.charCodeAt(i) < 58) n = n * 10 + +s[i++];
  return Math.min(2 ** 31 - 1, Math.max(-(2 ** 31), sign * n));
}
