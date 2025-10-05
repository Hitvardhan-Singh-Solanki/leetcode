class QElement<T> {
  readonly element: T;
  readonly priority: number;
  constructor(element: T, priority: number) {
    this.element = element;
    this.priority = priority;
  }
}

export default class PriorityQueue<T> {
  private items: Array<QElement<T>>;
  constructor() {
    this.items = [];
  }

  enqueue(item: T, priority: number) {
    const qElement = new QElement(item, priority);
    let contain = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return new Error('Underflow');
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return new Error('Underflow');
    }
    return this.items[0];
  }

  isEmpty() {
    return !this.items.length;
  }

  printPQueue() {
    let str = '';
    for (let i = 0; i < this.items.length; i++)
      str += this.items[i].element + ' ';
    return str;
  }

  rear() {
    if (this.isEmpty()) return new Error('Underflow');
    return this.items[this.items.length - 1];
  }
}
