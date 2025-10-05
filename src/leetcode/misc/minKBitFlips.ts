export function minKBitFlips(nums: number[], k: number): number {
  return minKBitFlipsConstantSpace(nums, k);
}

// naive approach
// Time: O(n), Space: O(n)
function minKBitFlipsAuxArray(nums: number[], k: number): number {
  const flipped: Array<boolean> = new Array(nums.length).fill(false);
  let validFlipsFromPastWindow = 0;
  let flipCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i >= k && flipped[i - k]) validFlipsFromPastWindow--;

    if (validFlipsFromPastWindow % 2 === nums[i]) {
      if (i + k > nums.length) return -1;
      validFlipsFromPastWindow++;
      flipped[i] = true;
      flipCount++;
    }
  }
  return flipCount;
}

// using Dequeue
// Time: O(n), Space: O(k)
function minKBitFlipsDeQ(nums: number[], k: number): number {
  const n = nums.length;
  const flipQ: Array<number> = [];
  let flipped = 0;
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (i >= k) flipped ^= flipQ[0];
    if (flipped === nums[i]) {
      if (i + k > n) return -1;
      flipQ.push(1);
      flipped ^= 1;
      result++;
    } else {
      flipQ.push(0);
    }

    if (flipQ.length > k) {
      flipQ.shift();
    }
  }
  return result;
}

// constant space
// Time: O(n), Space: O(1)
function minKBitFlipsConstantSpace(nums: number[], k: number): number {
  let currentFlips = 0; // Tracks the current number of flips
  let totalFlips = 0; // Tracks the total number of flips

  for (let i = 0; i < nums.length; ++i) {
    if (i >= k && nums[i - k] == 2) {
      currentFlips--;
    }

    if (currentFlips % 2 == nums[i]) {
      if (i + k > nums.length) {
        return -1;
      }
      nums[i] = 2;
      currentFlips++;
      totalFlips++;
    }
  }

  return totalFlips;
}
