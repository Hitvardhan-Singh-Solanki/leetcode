export function maxSatisfied(
  customers: number[],
  grumpy: number[],
  minutes: number
): number {
  let totalSatisfied = 0;
  const grumpyMinutes = [];

  for (let i = 0; i < customers.length; i++) {
    grumpyMinutes.push(customers[i] * grumpy[i]);
    if (grumpy[i] === 0) totalSatisfied += customers[i];
  }

  let maxSum = 0;
  let tempSum = 0;

  for (let i = 0; i < minutes; i++) {
    maxSum += grumpyMinutes[i];
  }

  tempSum = maxSum;

  for (let i = minutes; i < grumpyMinutes.length; i++) {
    tempSum = tempSum - grumpyMinutes[i - minutes] + grumpyMinutes[i];
    maxSum = Math.max(maxSum, tempSum);
  }

  return totalSatisfied + maxSum;
}
