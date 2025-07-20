type HeapType = 'min' | 'max';

interface IPriorityQueue<T> {
  enqueue(t: T): void;
  dequeue(): T | null;
  peek(): T | null;
  size(): number;
}

export class PriorityQueue<T> implements IPriorityQueue<T> {
  private heap: T[] = [];
  private comparator: (a: T, b: T) => number;

  constructor(heapType: HeapType = 'min', comparator?: (a: T, b: T) => number) {
    if (comparator) {
      this.comparator =
        heapType === 'min' ? comparator : (a, b) => comparator(b, a);
    } else {
      this.comparator =
        heapType === 'min'
          ? (a: any, b: any) => a - b
          : (a: any, b: any) => b - a;
    }
  }
  enqueue(t: T): void {
    this.heap.push(t);
    this.siftUp();
  }

  dequeue(): T | null {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.siftDown();
    }
    return top;
  }

  peek(): T | null {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  print(): void {
    console.log(this.heap);
  }

  getQ(): T[] {
    return [...this.heap];
  }

  private siftUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (this.comparator(element, parent) >= 0) break;
      this.heap[idx] = parent;
      this.heap[parentIdx] = element;
      idx = parentIdx;
    }
  }

  private siftDown(idx = 0) {
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx = idx;

      if (
        leftIdx < length &&
        this.comparator(this.heap[leftIdx], this.heap[swapIdx]) < 0
      ) {
        swapIdx = leftIdx;
      }
      if (
        rightIdx < length &&
        this.comparator(this.heap[rightIdx], this.heap[swapIdx]) < 0
      ) {
        swapIdx = rightIdx;
      }
      if (swapIdx === idx) break;
      this.heap[idx] = this.heap[swapIdx];
      this.heap[swapIdx] = element;
      idx = swapIdx;
    }
  }
}
