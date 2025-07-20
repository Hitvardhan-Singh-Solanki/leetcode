export class KthLargest {
  k: number;
  nums: number[];
  constructor(k: number, nums: number[]) {
    this.k = k;
    this.nums = nums.sort((a, b) => b - a).slice(0, k);
  }

  add(val: number): number {
    let i = 0;
    while (i < this.nums.length && this.nums[i] > val) {
      i++;
    }
    this.nums.splice(i, 0, val);
    if (this.nums.length > this.k) this.nums.pop();

    return this.nums[this.k - 1];
  }
}

/**
Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]

10 9 8 5 5 4 4 3 2 

Output
[null, 4, 5, 5, 8, 8]
 */
