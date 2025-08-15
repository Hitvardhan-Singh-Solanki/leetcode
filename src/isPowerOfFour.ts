export function isPowerOfFour(n: number): boolean {
  //   return (Math.log(n) / Math.log(4)) % 1 == 0; (sol 1: solving with floating point airthemtic)
  const mask = 0x55555555; // binary: 01010101010101010101010101010101
  return n > 0 && (n & (n - 1)) === 0 && (n & mask) !== 0;
}
