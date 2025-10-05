type Graph = {
  [key: number]: {
    [key: number]: number;
  };
};

export function maxProbability(
  n: number,
  edges: number[][],
  succProb: number[],
  start_node: number,
  end_node: number
): number {
  const graph = buildGraph(edges, succProb);
  return dijkstra(graph, start_node, end_node, n);
}

function dijkstra(
  graph: Graph,
  src: number,
  target: number,
  n: number
): number {
  const probabilities = Array(n).fill(0);
  probabilities[src] = 1;

  const pq = new PriorityQueue((a, b) => a[0] - b[0]);
  pq.push([1, src]);

  while (pq.size() > 0) {
    const [prob, node] = pq.pop()!;
    if (node === target) return prob;

    if (graph[node]) {
      for (const neighbor in graph[node]) {
        const newProb = prob * graph[node][neighbor];
        if (newProb > probabilities[+neighbor]) {
          probabilities[+neighbor] = newProb;
          pq.push([newProb, +neighbor]);
        }
      }
    }
  }

  return 0;
}

function buildGraph(edges: number[][], succProb: number[]): Graph {
  const graph: Graph = {};
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    const weight = succProb[i];

    if (!graph[a]) graph[a] = {};
    if (!graph[b]) graph[b] = {};
    graph[a][b] = weight;
    graph[b][a] = weight;
  }

  return graph;
}

class PriorityQueue {
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
