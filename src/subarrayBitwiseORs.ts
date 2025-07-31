/**
 * Returns the number of distinct bitwise OR results from all contiguous subarrays of the input array.
 *
 * @param arr - The input array of numbers
 * @returns The count of unique bitwise OR values from all possible contiguous subarrays
 */
export function subarrayBitwiseORs(arr: number[]): number {
  const result = new Set<number>();
  let prev = new Set<number>();

  for (const x of arr) {
    const curr = new Set<number>();
    curr.add(x);

    for (const y of prev) {
      curr.add(y | x);
    }

    for (const val of curr) {
      result.add(val);
    }
    prev = curr;
  }

  return result.size;
}
