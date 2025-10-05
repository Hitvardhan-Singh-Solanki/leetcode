/**
 * Returns the maximum number possible by changing at most one digit
 * (6 becomes 9, and 9 becomes 6)
 * @param num - A positive integer consisting only of digits 6 and 9
 * @returns The maximum possible number after changing at most one digit
 */
export const maximum69Number = (num: number): number =>
  Number(num.toString().replace('6', '9'));

/**
***** Verbose solution *****
function maximum69Number (num: number): number {
  const numString = num.toString().split('');
  for (let i = 0; i < numString.length; i++) {
    const ch = numString[i];
    if (ch === '6') {
      numString[i] = '9';
      break;
    }
  }
  return Number(numString.join(''));
};
 */
