export function judgeSquareSum(c: number): boolean {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));

  while (left <= right) {
    const sum = left ** 2 + right ** 2;
    if (sum === c) return true;
    else if (sum < c) left++;
    else right--;
  }

  return false;
}
