import { ListNode } from './linkedList';

interface IQueue<T> {
  enqueue(val: T): void;
  dequeue(): T | null;
  peek(): T | null;
}

export class Queue<T> implements IQueue<T> {
  private readonly _q: T[] = [];
  private _length = 0;

  enqueue(val: T): void {
    this._q.push(val);
    this._length++;
  }

  dequeue(): T | null {
    if (!this._length) return null;
    this._length--;
    return this._q.shift() || null;
  }

  peek(): T | null {
    return this._q[0];
  }

  get length() {
    return this._length;
  }
}

export class QueueLL<T> implements IQueue<T> {
  private _q_head: ListNode<T> | null = null;
  private _length = 0;
  private _q_tail: ListNode<T> | null = null;

  enqueue(val: T): void {
    const node = new ListNode<T>(val);
    if (this._length <= 1 && this._q_head === this._q_tail) {
      this._q_head = node;
      this._q_tail = this._q_head;
      this._length++;
    } else if (this._q_tail) {
      this._q_tail.next = node;
      this._q_tail = this._q_tail.next;
      this._length++;
    }
  }

  // TODO: Need to implement this
  dequeue(): T | null {
    throw Error('method not implemented');
  }

  peek(): T | null {
    return this._q_head?.val || null;
  }
}
