type OutGoingEdgeMap = {
  [key: number]: number;
};

export function maximumImportance(n: number, roads: number[][]): number {
  const roadCount = new Array(n).fill(0);

  for (const [a, b] of roads) {
    roadCount[a]++;
    roadCount[b]++;
  }

  roadCount.sort((a, b) => a - b);

  let totalImportance = 0;
  for (let i = 1; i <= n; i++) totalImportance += i * roadCount[i - 1];

  return totalImportance;
}
