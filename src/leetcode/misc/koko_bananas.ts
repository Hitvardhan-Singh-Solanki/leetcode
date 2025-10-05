export function minEatingSpeed(piles: number[], h: number): number {
  let max = 0;
  let sum = 0;

  for (const pile of piles) {
    max = Math.max(max, pile);
    sum += pile;
  }

  let slow: number = Math.floor(sum / h);
  let fast: number = max;
  let res: number = max;

  while (slow <= fast) {
    const mid = slow + Math.floor((fast - slow) / 2);
    let hoursLeft = h;

    for (let i = 0; i < piles.length; i++) {
      const hoursToTake = Math.ceil(piles[i] / mid);
      hoursLeft -= hoursToTake;
      if (hoursLeft < piles.length - i - 1) {
        hoursLeft = -1;
        break;
      }
    }

    if (hoursLeft >= 0) {
      res = Math.min(res, mid);
      fast = mid - 1;
    } else {
      slow = mid + 1;
    }
  }

  return res;
}

/**
 * 
 * 
 * 
 * Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4


Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30
Example 3:

Input: piles = [30,11,23,4,20], h = 6
k = 1 - 30
k = 2 
Output: 23
 */
