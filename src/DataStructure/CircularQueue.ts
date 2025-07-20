export default class CircularQ {
  private _capacity: number;
  private _size: number;
  private _bottom: number;
  private _maxSize: number;
  private _data: Uint16Array;
  constructor(capacity: number) {
    this._capacity = capacity;
    this._size = 0;
    this._bottom = 0;
    this._maxSize = 0;
    this._data = new Uint16Array(capacity);
  }
  private _getCircularIndex(index: number) {
    let result = index % this._capacity;
    if (result < 0) result += this._capacity;
    return result;
  }

  get capacity() {
    return this._capacity;
  }

  get size() {
    return this._size;
  }

  get nextItem() {
    return this._size ? this._data[this._bottom] : undefined;
  }

  get lastItem() {
    return this._size
      ? this._data[this._getCircularIndex(this._bottom + this._size - 1)]
      : undefined;
  }

  fromFirst(index: number) {
    return index < this._size
      ? this._data[this._getCircularIndex(this._bottom + index)]
      : undefined;
  }

  fromLast(index: number) {
    return index < this._size
      ? this._data[
          this._getCircularIndex(this._bottom + this._size - 1 - index)
        ]
      : undefined;
  }

  enqueue(...items: number[]) {
    if (this._size + items.length > this._capacity)
      throw new Error('Queue capacity exceeded.');

    let queueIndex = (this._bottom + this._size) % this._capacity;
    this._size += items.length;
    this._maxSize = Math.max(this._size, this._maxSize);
    for (let i = 0; i < items.length; i++) {
      this._data[queueIndex] = items[i];
      queueIndex = (queueIndex + 1) % this._capacity;
    }
  }

  dequeue() {
    if (!this._size) return undefined;

    const result = this._data[this._bottom];
    this._bottom = (this._bottom + 1) % this._capacity;
    this._size--;

    return result;
  }

  clear() {
    this._size = 0;
  }

  get maxSize() {
    return this._maxSize;
  }
}
