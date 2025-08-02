/**
 * Calculates the minimum cost to make two baskets equal through swaps
 *
 * @param basket1 - First basket of fruits with their costs
 * @param basket2 - Second basket of fruits with their costs
 * @returns The minimum cost to make baskets equal, or -1 if impossible
 *
 * Constraints:
 * - basket1.length == basket2.length
 * - 1 <= basket1.length <= 10^5
 * - 1 <= basket1[i],basket2[i] <= 10^9
 *
 * The cost of a swap is the minimum of the two fruits being swapped.
 * Baskets are equal if they have the same elements when sorted.
 */
export function minCost(basket1: number[], basket2: number[]): number {
  const freq = new Map<number, number>();
  let m = Infinity;

  for (const b of basket1) {
    freq.set(b, (freq.get(b) || 0) + 1);
    m = Math.min(m, b);
  }
  for (const b of basket2) {
    freq.set(b, (freq.get(b) || 0) - 1);
    m = Math.min(m, b);
  }

  const merge: number[] = [];
  for (const [k, c] of freq.entries()) {
    if (c % 2 !== 0) return -1;
    for (let i = 0; i < Math.abs(c) / 2; i++) {
      merge.push(k);
    }
  }

  merge.sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < merge.length / 2; i++) {
    res += Math.min(2 * m, merge[i]);
  }
  return res;
}
