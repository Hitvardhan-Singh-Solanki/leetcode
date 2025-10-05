export function sumZero(n: number): number[] {
  let pairs: number[] = [];
  if (n % 2 !== 0) pairs.push(0);
  for (let i = 1; i <= Math.floor(n / 2); i++) pairs.push(i, -i);
  return pairs;
}
