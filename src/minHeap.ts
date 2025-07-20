interface IPriorityQueueMinHeap<T> {
  peek(): T | null;
  remove(): T | null;
  add(element: T): boolean;
}

export default class PriorityQueueMinHeap<T>
  implements IPriorityQueueMinHeap<T>
{
  private readonly heap: Array<T>;
  constructor() {
    this.heap = [];
  }

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private getLeftChild(index: number): T {
    return this.heap[this.getLeftChildIndex(index)];
  }

  private getRightChild(index: number): T {
    return this.heap[this.getRightChildIndex(index)];
  }

  private parent(index: number): T {
    return this.heap[this.getParentIndex(index)];
  }

  private swap(idxOne: number, idxTwo: number): void {
    [this.heap[idxOne], this.heap[idxTwo]] = [
      this.heap[idxTwo],
      this.heap[idxOne],
    ];
  }

  private heapifyDown() {
    let idx = 0;
    while (this.hasLeftChild(idx)) {
      let smallerChildIdx = this.getLeftChildIndex(idx);
      if (
        this.hasRightChild(idx) &&
        this.getRightChild(idx) < this.getLeftChild(idx)
      ) {
        smallerChildIdx = this.getRightChildIndex(idx);
      }

      if (this.heap[idx] < this.heap[smallerChildIdx]) {
        break;
      } else {
        this.swap(idx, smallerChildIdx);
      }
      idx = smallerChildIdx;
    }
  }

  private heapifyUp() {
    let lastIdx = this.heap.length - 1;
    while (
      this.hasParent(lastIdx) &&
      this.parent(lastIdx) > this.heap[lastIdx]
    ) {
      this.swap(this.getParentIndex(lastIdx), lastIdx);
      lastIdx = this.getParentIndex(lastIdx);
    }
  }

  peek(): T | null {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  add(element: T): boolean {
    this.heap.push(element);
    this.heapifyUp();
    return true;
  }

  remove(): T | null {
    if (this.heap.length === 0) return null;
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }
}
