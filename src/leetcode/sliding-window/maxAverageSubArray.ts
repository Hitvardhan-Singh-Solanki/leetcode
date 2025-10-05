export function findMaxAverage(nums: number[], k: number): number {
  let i = 0;
  let sum = 0;
  let maxSum = 0;
  while (i < nums.length) {
    sum += nums[i];
    if (i < k) maxSum = sum;
    else {
      sum -= nums[i - k];
      maxSum = Math.max(sum, maxSum);
    }
    i++;
  }
  return maxSum / k;
}

/**
 *
 * How to calculate an average
 * [1,2,3,4]
 *
 * 1+2+3+4 / 4 = 2.5
 */
