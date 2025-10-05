export function minimumAverage(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let i = 0;
  let j = nums.length - 1;
  let smallestAvg = Infinity;
  while (i <= j) {
    const currentAvg = (nums[i] + nums[j]) / 2;
    smallestAvg = Math.min(currentAvg, smallestAvg);
    i++;
    j--;
  }
  return smallestAvg;
}
