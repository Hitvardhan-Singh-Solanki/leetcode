export function largestAltitude(gain: number[]): number {
  let sum = 0;
  let max = 0;
  let i = 0;
  while (i < gain.length) {
    sum += gain[i];
    max = Math.max(sum, max);
    i++;
  }

  return max;
}
