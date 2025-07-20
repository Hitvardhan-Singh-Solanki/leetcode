type MinCostMap = {
  [key: string]: MinCostMapVal;
};

type MinCostMapVal = {
  [key: string]: number;
};

type AlphaMap = {
  [key: string]: string[][];
};

type DijkstrasHeap = string[][];

export function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[]
): number {
  const arrLength = original.length;
  const sourceSet = new Set(source);
  const alphaMap: AlphaMap = {};
  for (let i = 0; i < arrLength; i++) {
    const src = original[i];
    const dest = changed[i];
    const curCost = cost[i];
    if (!alphaMap[src]) {
      alphaMap[src] = [[dest, curCost.toString()]];
    } else {
      alphaMap[src].push([dest, curCost.toString()]);
    }
  }
  const minCostMap: MinCostMap = {};
  for (const c of sourceSet) {
    minCostMap[c] = dijkstras(c, alphaMap);
  }

  let res = 0;
  for (let i = 0; i < arrLength; i++) {
    const src = source[i];
    const dest = target[i];
    const minCost = minCostMap[src];
    if (!minCost[dest]) return -1;
    res += minCostMap[src][dest];
  }
  return res;
}

function dijkstras(src: string, alphaMap: AlphaMap): MinCostMapVal {
  const heap: DijkstrasHeap = [['0', src]];
  const minCostMapVal: MinCostMapVal = {};

  while (heap.length > 0) {
    const [cost, node] = heap.pop()!;
    if (!minCostMapVal[node]) {
      minCostMapVal[node] = Number(cost);
      const neighbours = alphaMap[node];

      if (neighbours) {
        for (const [neighbour, neiCost] of neighbours) {
          heap.push([(cost + neiCost).toString(), neighbour]);
          heap.sort((a, b) => Number(a[0]) - Number(b[0]));
        }
      }
    }
  }

  return minCostMapVal;
}
