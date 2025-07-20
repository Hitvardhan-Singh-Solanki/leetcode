type Graph = {
  [key: number]: {
    [key: number]: number;
  };
};

export function networkDelayTime(
  times: number[][],
  n: number,
  k: number
): number {
  const graph = buildDirectedGraph(times);

  return dijkstra(graph, k, n);
}

function dijkstra(graph: Graph, src: number, n: number): number {
  const networkDelays = new Array(n + 1).fill(Infinity);
  networkDelays[src] = 0;

  const pq = new _PriorityQueue((a, b) => a[0] - b[0]);
  pq.push([0, src]);
  while (!pq.isEmpty()) {
    const [time, node] = pq.pop()!;
    if (graph[node]) {
      for (const nei in graph[node]) {
        const newTime = time + graph[node][nei];
        if (newTime < networkDelays[+nei]) {
          networkDelays[+nei] = newTime;
          pq.push([newTime, +nei]);
        }
      }
    }
  }

  console.log(networkDelays);

  let max = -Infinity;
  for (let i = 1; i < networkDelays.length; i++) {
    const time = networkDelays[i];
    if (time === Infinity) return -1;
    max = Math.max(time, max);
  }
  return max === 0 ? -1 : max;
}

function buildDirectedGraph(edges: number[][]): Graph {
  const graph: Graph = {};
  for (let i = 0; i < edges.length; i++) {
    const [a, b, weight] = edges[i];
    if (!graph[a]) graph[a] = {};
    graph[a][b] = weight;
  }
  return graph;
}

class _PriorityQueue {
  heap: [number, number][];
  comparator: (a: [number, number], b: [number, number]) => number;

  constructor(
    comparator: (a: [number, number], b: [number, number]) => number
  ) {
    this.heap = [];
    this.comparator = comparator;
  }

  push(item: [number, number]) {
    this.heap.push(item);
    this.bubbleUp();
  }

  pop(): [number, number] | undefined {
    const poppedValue = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0 && bottom !== undefined) {
      this.heap[0] = bottom;
      this.sinkDown(0);
    }
    return poppedValue;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return !(this.size() > 0);
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (this.comparator(element, parent) <= 0) break;
      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  sinkDown(index: number) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.comparator(leftChild, element) > 0) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && this.comparator(rightChild, element) > 0) ||
          (swap !== null && this.comparator(rightChild, leftChild!) > 0)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = element;
  }
}
