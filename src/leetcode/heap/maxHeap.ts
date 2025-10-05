interface IPriorityQueueMaxHeap<T> {
  add(element: T): void;
  remove(): T | null;
  peek(): T | null;
}

export default class PriorityQueueMaxHeap<T>
  implements IPriorityQueueMaxHeap<T>
{
  private readonly heap: Array<T>;

  constructor() {
    this.heap = [];
  }

  private getLeftChildIndex(parentIdx: number): number {
    return 2 * parentIdx + 1;
  }

  private getRightChildIndex(parentIdx: number): number {
    return 2 * parentIdx + 2;
  }

  private getParentIndex(idx: number): number {
    return Math.floor((idx - 1) / 2);
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

  private leftChild(index: number): T {
    return this.heap[this.getLeftChildIndex(index)];
  }

  private rightChild(index: number): T {
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

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index) < this.heap[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  private heapifyDown(): void {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index) > this.leftChild(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] > this.heap[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }

      index = smallerChildIndex;
    }
  }

  add(element: T): void {
    this.heap.push(element);
    this.heapifyUp();
  }

  remove(): T | null {
    if (this.heap.length === 0) return null;
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }

  peek(): T | null {
    if (this.heap.length === 0) return null;

    return this.heap[0];
  }
}
