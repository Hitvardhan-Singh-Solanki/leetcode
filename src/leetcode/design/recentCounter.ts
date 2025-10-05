export class RecentCounter {
  queue: number[] = [];

  ping(t: number): number {
    this.queue.push(t);

    while (this.queue[0] < t - 3000) {
      this.queue.shift();
    }

    return this.queue.length;
  }
}
