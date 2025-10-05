/*
You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:

difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
Every worker can be assigned at most one job, but one job can be completed multiple times.

For example, if three workers attempt the same job that pays $1, then the total profit will be $3. 
If a worker cannot complete any job, their profit is $0.
Return the maximum profit we can achieve after assigning the workers to the jobs.
 */

export function maxProfitAssignment(
  difficulty: number[],
  profit: number[],
  worker: number[]
): number {
  const tempArr = [];
  for (let i = 0; i < profit.length; i++) {
    tempArr.push([profit[i], difficulty[i]]);
  }

  tempArr.sort((a, b) => b[0] - a[0]);
  worker.sort((a, b) => b - a);

  let workerIndex = 0;
  let profitIndex = 0;
  let res = 0;
  while (workerIndex < worker.length && profitIndex < profit.length) {
    if (worker[workerIndex] >= tempArr[profitIndex][1]) {
      res += tempArr[profitIndex][0];
      workerIndex++;
    } else profitIndex++;
  }
  return res;
}
