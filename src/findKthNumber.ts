export function findKthNumber(n: number, k: number): number {
  let curr = 1;
  k--;

  while (k > 0) {
    let steps = countSteps(n, curr, curr + 1);
    if (steps <= k) {
      curr++;
      k -= steps;
    } else {
      curr *= 10;
      k--;
    }
  }

  return curr;
}

function countSteps(n: number, prefix1: number, prefix2: number): number {
  let steps = 0;
  while (prefix1 <= n) {
    steps += Math.min(n + 1, prefix2) - prefix1;
    prefix1 *= 10;
    prefix2 *= 10;
  }
  return steps;
}

/**
 * function lexicalOrder(n: number): number[] {
  const result: number[] = [];
  let curr = 1;
  for (let i = 0; i < n; i++) {
    result.push(curr);

    if (curr * 10 <= n) {
      curr *= 10;
    } else {
      while (curr % 10 === 9 || curr + 1 > n) {
        curr = Math.floor(curr / 10);
      }
      curr++;
    }
  }

  return result;
}
 */
