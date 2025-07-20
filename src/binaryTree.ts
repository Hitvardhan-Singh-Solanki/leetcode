import { log } from 'console';
import { Queue } from './queue';

interface IBinaryTree {
  insert(val: number): void;
  search(val: number, searchKey: SEARCH_KEY): TreeNode | null;
  delete(val: number): boolean;
}

export enum SEARCH_KEY {
  BFS = 'bfs',
  DFS = 'dfs',
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export class BinaryTree implements IBinaryTree {
  private _root: TreeNode | null;
  constructor() {
    this._root = null;
  }
  delete(val: number): boolean {
    let deleted = false;
    this._root = this._deleteNode(this._root, val, (wasDeleted) => {
      deleted = wasDeleted;
    });
    return deleted;
  }

  private _deleteNode(
    node: TreeNode | null,
    val: number,
    onDelete: (deleted: boolean) => void
  ): TreeNode | null {
    if (node === null) {
      onDelete(false);
      return null;
    }

    if (val < node.val) {
      node.left = this._deleteNode(node.left, val, onDelete);
      return node;
    } else if (val > node.val) {
      node.right = this._deleteNode(node.right, val, onDelete);
      return node;
    } else {
      // Node found
      onDelete(true);
      // Node with only one child or no child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      let successorParent = node;
      let successor = node.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      // Copy the inorder successor's value to this node
      node.val = successor.val;
      // Delete the inorder successor
      if (successorParent !== node) {
        successorParent.left = this._deleteNode(successorParent.left, successor.val, () => {});
      } else {
        successorParent.right = this._deleteNode(successorParent.right, successor.val, () => {});
      }
      return node;
    }
  }

  insert(val: number): void {
    const newNode = new TreeNode(val);
    if (this._root === null) {
      this._root = newNode;
    } else {
      this.insertNode(this._root, newNode);
    }
  }

  private insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.val < node.val) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(val: number, searchKey: SEARCH_KEY): TreeNode | null {
    if (searchKey === SEARCH_KEY.BFS) return this.bfs(val);
    return this.dfs(val);
  }

  private bfs(val: number, head = this._root): TreeNode | null {
    if (head === null) return null;
    const queue = new Queue<TreeNode>();
    queue.enqueue(head);
    while (queue.length) {
      const currHead = queue.dequeue();
      if (currHead?.val === val) return currHead;
      if (currHead?.left) queue.enqueue(currHead.left);
      if (currHead?.right) queue.enqueue(currHead.right);
    }
    return null;
  }
  private dfs(val: number, head = this._root): TreeNode | null {
    if (head !== null) {
      log(head.val, val);
      if (head.val === val) return head;
      const left = this.dfs(val, head.left);
      const right = this.dfs(val, head.right);
      if (left) return left;
      if (right) return right;
    }
    return null;
  }

  bft(head = this._root, result: number[] = []): number[] | null {
    if (head === null) return null;
    const queue = new Queue<TreeNode>();
    queue.enqueue(head);
    while (queue.length) {
      const currHead = queue.dequeue();
      if (currHead === null) return null;
      if (currHead.val !== null) result.push(currHead.val);
      if (currHead.left !== null) queue.enqueue(currHead.left);
      if (currHead.right !== null) queue.enqueue(currHead.right);
    }
    return result;
  }
}
