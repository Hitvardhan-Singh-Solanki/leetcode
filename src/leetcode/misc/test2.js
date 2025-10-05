function findVulnerabilityFactor(key, maxChange) {
  const n = key.length;
  if (maxChange >= n) return 0;

  const gcdCache = new Map();
  function getCachedGcd(a, b) {
    const key = `${Math.min(a, b)},${Math.max(a, b)}`;
    if (!gcdCache.has(key)) gcdCache.set(key, gcd(a, b));
    return gcdCache.get(key);
  }

  function getMaxGcdLength(arr) {
    let maxLen = 0;
    const n = arr.length;
    const prefixGcd = new Array(n);
    prefixGcd[0] = arr[0];

    for (let i = 1; i < n; i++) {
      prefixGcd[i] = getCachedGcd(prefixGcd[i - 1], arr[i]);
    }

    for (let i = 0; i < n; i++) {
      let currGcd = arr[i];
      if (currGcd === 1) continue;

      for (let j = i; j < n; j++) {
        if (j > i) {
          currGcd = getCachedGcd(currGcd, arr[j]);
        }
        if (currGcd === 1) break;
        maxLen = Math.max(maxLen, j - i + 1);
      }
    }
    return maxLen;
  }

  const primes = [3, 5, 7, 11, 13];
  const primeGcdCache = new Map();
  for (const p1 of primes) {
    for (const p2 of primes) {
      const key = `${Math.min(p1, p2)},${Math.max(p1, p2)}`;
      primeGcdCache.set(key, getCachedGcd(p1, p2));
    }
  }

  const memo = new Map();

  function tryChanges(arr, changesLeft, pos) {
    if (changesLeft < 0) return Infinity;
    if (pos === n) return getMaxGcdLength(arr);

    const state = `${pos},${changesLeft},${arr.join(',')}`;
    if (memo.has(state)) return memo.get(state);

    let result = tryChanges(arr, changesLeft, pos + 1);

    const original = arr[pos];
    for (const prime of primes) {
      if (pos > 0) {
        const key = `${Math.min(prime, arr[pos - 1])},${Math.max(
          prime,
          arr[pos - 1]
        )}`;
        if (primeGcdCache.get(key) > 1) continue;
      }
      if (pos < n - 1) {
        const key = `${Math.min(prime, arr[pos + 1])},${Math.max(
          prime,
          arr[pos + 1]
        )}`;
        if (primeGcdCache.get(key) > 1) continue;
      }

      arr[pos] = prime;
      result = Math.min(result, tryChanges(arr, changesLeft - 1, pos + 1));
      arr[pos] = original;
    }

    memo.set(state, result);
    return result;
  }

  return tryChanges(key, maxChange, 0);
}

function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

// key = []
// maxChange = 1
