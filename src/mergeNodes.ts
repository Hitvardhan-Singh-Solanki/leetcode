import { ListNode, SLL } from './linkedList';

export function mergeNodesConstructor(arr: number[]) {
  const ll = createLL(arr);
  return mergeNodes(ll);
}

function mergeNodes(head: ListNode<number> | null): ListNode<number> | null {
  if (!head) return null;
  if (!head.next) return new ListNode();
  let curr = head;
  while (curr.next) {
    const node = curr.next;
    curr = curr.next;
    while (curr.next && curr.next.val !== 0) {
      node.val += curr.next.val;
      curr = curr.next;
    }
    curr = curr.next!;
    node.next = curr.next;
  }

  return head.next;
}

function createLL(arr: number[]): ListNode<number> | null {
  const sll = new SLL<number>();
  for (const i of arr) sll.append(i);
  return sll.head;
}
