/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

export class ListNode<T> {
  val: T | 0;
  next: ListNode<T> | null;
  constructor(val?: T, next?: ListNode<T> | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export class SLL<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  append(val: T) {
    const node = new ListNode(val);
    if (!this.head) {
      this.#head = node;
      this.#tail = node;
      return;
    }
    let curr = this.head;
    while (curr.next !== null) {
      curr = curr.next;
    }
    curr.next = node;
    this.#tail = node;
  }

  get head(): ListNode<T> | null {
    return this.#head;
  }

  get tail(): ListNode<T> | null {
    return this.#tail;
  }
}
