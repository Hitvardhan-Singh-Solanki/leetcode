export function countHillValley(nums: number[]): number {
  let cleaned: Array<number> = [];
  let curr = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let newNum = nums[i];
    if (newNum !== curr) {
      cleaned.push(newNum);
      curr = newNum;
    }
  }

  let count = 0;
  for (let i = 1; i < cleaned.length - 1; i++) {
    let prev = cleaned[i - 1];
    let curr = cleaned[i];
    let next = cleaned[i + 1];
    if ((prev < curr && curr > next) || (prev > curr && curr < next)) count++;
  }
  return count;
}
