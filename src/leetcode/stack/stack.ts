export class Stack<T> {
  private readonly _stack: T[] = [];
  private _length = 0;
  push(val: T): void {
    this._stack.push(val);
    this._length++;
  }
  pop(): T | null {
    if (this._stack.length > 0) {
      this._length--;
      return this._stack.pop() || null;
    }
    return null;
  }

  peek(): T | null {
    if (this._stack.length > 0) return this._stack[this._stack.length - 1];
    return null;
  }

  get length() {
    return this._length;
  }
}
