import { maxFreqSum } from './maxFreqSum';

function leetcodeVersion(s: string): number {
  let vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let az = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    az.set(s[i], (az.get(s[i]) || 0) + 1);
  }

  let v = 0,
    c = 0;
  for (let [key, value] of az) {
    if (vowels.has(key)) v = Math.max(v, value);
    else c = Math.max(c, value);
  }
  return v + c;
}

function minimalVersion(s: string): number {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const freq: Record<string, number> = {};
  let v = 0,
    c = 0;

  for (const ch of s) {
    const f = (freq[ch] = (freq[ch] || 0) + 1);
    if (vowels.has(ch)) v = Math.max(v, f);
    else c = Math.max(c, f);
  }
  return v + c;
}

// --- Benchmark ---
function benchmark(fn: (s: string) => number, name: string, input: string) {
  const start = performance.now();
  const result = fn(input);
  const end = performance.now();
  console.log(`${name}: result=${result}, time=${(end - start).toFixed(3)}ms`);
}

// Generate a big string of 1M chars
const letters = 'abcdefghijklmnopqrstuvwxyz';
let bigString = '';
for (let i = 0; i < 1_000_000; i++) {
  bigString += letters[Math.floor(Math.random() * 26)];
}

// Run benchmarks
benchmark(maxFreqSum, 'Original Version', bigString);
benchmark(leetcodeVersion, 'LeetCode Version', bigString);
benchmark(minimalVersion, 'Minimal Version', bigString);
