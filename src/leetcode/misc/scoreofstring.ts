export function scoreOfString(s: string): number {
  let sum = 0;
  let prev = -1;
  for (const ch of s) {
    const cha = ch.charCodeAt(0);
    if (prev !== -1) sum += Math.abs(prev - cha);
    prev = cha;
  }
  return sum;
}
