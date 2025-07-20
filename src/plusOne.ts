export const plusOne = (digits: number[]): number[] =>
  (BigInt(digits.join('')) + BigInt(1)).toString().split('').map(Number);
