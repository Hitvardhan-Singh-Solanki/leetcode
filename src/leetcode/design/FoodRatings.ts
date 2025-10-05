type FoodInfo = {
  rating: number;
  food: string;
};

class MaxHeap {
  private data: FoodInfo[] = [];

  private compare(a: FoodInfo, b: FoodInfo): boolean {
    if (a.rating !== b.rating) return a.rating > b.rating;
    return a.food < b.food;
  }

  push(item: FoodInfo): void {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  peek(): FoodInfo | undefined {
    return this.data[0];
  }

  pop(): FoodInfo | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    const item = this.data[index];
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.compare(this.data[parentIdx], item)) break;
      this.data[index] = this.data[parentIdx];
      index = parentIdx;
    }
    this.data[index] = item;
  }

  private bubbleDown(index: number): void {
    const length = this.data.length;
    const item = this.data[index];
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let swap = -1;

      if (left < length) {
        if (!this.compare(item, this.data[left])) swap = left;
      }
      if (right < length) {
        if (
          (swap === -1 && !this.compare(item, this.data[right])) ||
          (swap !== -1 && !this.compare(this.data[left], this.data[right]))
        ) {
          swap = right;
        }
      }
      if (swap === -1) break;
      this.data[index] = this.data[swap];
      index = swap;
    }
    this.data[index] = item;
  }
}

export class FoodRatings {
  private foodToCuisine: Map<string, string> = new Map();
  private foodToRating: Map<string, number> = new Map();
  private cuisineHeaps: Map<string, MaxHeap> = new Map();

  constructor(foods: string[], cuisines: string[], ratings: number[]) {
    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      const cuisine = cuisines[i];
      const rating = ratings[i];

      this.foodToCuisine.set(food, cuisine);
      this.foodToRating.set(food, rating);

      if (!this.cuisineHeaps.has(cuisine)) {
        this.cuisineHeaps.set(cuisine, new MaxHeap());
      }
      this.cuisineHeaps.get(cuisine)!.push({ rating, food });
    }
  }

  changeRating(food: string, newRating: number): void {
    this.foodToRating.set(food, newRating);
    const cuisine = this.foodToCuisine.get(food)!;
    this.cuisineHeaps.get(cuisine)!.push({ rating: newRating, food });
  }

  highestRated(cuisine: string): string {
    const heap = this.cuisineHeaps.get(cuisine)!;
    while (heap.peek()) {
      const top = heap.peek()!;
      if (this.foodToRating.get(top.food)! === top.rating) {
        return top.food;
      }
      heap.pop();
    }
    return '';
  }
}
