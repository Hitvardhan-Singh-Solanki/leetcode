function findVulnerabilityFactor(key: number[], maxChange: number): number {
  const n = key.length;
  if (maxChange >= n) return 0;

  const primes = [3, 5, 7, 11, 13];
  const primeGcdCache = new Map<number, Set<number>>();
  for (const p of primes) {
    primeGcdCache.set(p, new Set());
    for (const other of primes) {
      if (gcd(p, other) > 1) {
        primeGcdCache.get(p)!.add(other);
      }
    }
  }

  function getMaxGcdLength(arr: number[]): number {
    let maxLen = 0;
    let currGcd = 0;
    let start = 0;

    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        currGcd = arr[i];
      } else {
        currGcd = gcd(currGcd, arr[i]);
      }

      if (currGcd === 1) {
        start = i + 1;
        currGcd = i + 1 < arr.length ? arr[i + 1] : 0;
      } else {
        maxLen = Math.max(maxLen, i - start + 1);
      }
    }
    return maxLen;
  }

  const dp = new Map<string, number>();

  function solve(pos: number, changesLeft: number, arr: number[]): number {
    if (changesLeft < 0) return Infinity;
    if (pos === arr.length) return getMaxGcdLength(arr);

    const state = `${pos},${changesLeft},${arr.join(',')}`;
    if (dp.has(state)) return dp.get(state)!;

    let minVuln = solve(pos + 1, changesLeft, arr);

    const original = arr[pos];
    for (const prime of primes) {
      const valid = true;
      if (pos > 0 && primeGcdCache.get(prime)!.has(arr[pos - 1])) continue;
      if (pos < n - 1 && primeGcdCache.get(prime)!.has(arr[pos + 1])) continue;

      arr[pos] = prime;
      minVuln = Math.min(minVuln, solve(pos + 1, changesLeft - 1, arr));
      arr[pos] = original;
    }

    dp.set(state, minVuln);
    return minVuln;
  }

  const keyCopy = [...key];
  return solve(0, maxChange, keyCopy);
}

function gcd(a: number, b: number): number {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Test
const key = [4, 2, 4];
const maxChange = 1;
console.log(findVulnerabilityFactor(key, maxChange)); // Outputs 2

// demo questions
// ques 1 -> transaction tracking
// ques 2 -> audible subscription

// actual questions
// ques 1 -> cinema entries for overlapping shows and returning max viewership (dp)
// ques 2 -> find vulnerability factor of the given key based on maxChange
