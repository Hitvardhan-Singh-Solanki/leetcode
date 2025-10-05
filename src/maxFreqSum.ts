export function maxFreqSum(s: string): number {
  // O(26)
  const alphabetArray = new Array(26).fill(0);
  // O(5)
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
  // O(1)
  const aCharCode = 'a'.charCodeAt(0);
  // O(n)
  for (const char of s) {
    const index = char.charCodeAt(0) - aCharCode;
    alphabetArray[index]++;
  }

  // O(1)
  let maxVowelFreq = 0;
  // O(5)
  for (const vowel of vowelSet) {
    // O(1)
    const index = vowel.charCodeAt(0) - aCharCode;
    // O(1)
    maxVowelFreq = Math.max(maxVowelFreq, alphabetArray[index]);
  }

  let maxConsonantFreq = 0;
  // O(26)
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(aCharCode + i);
    if (!vowelSet.has(char)) {
      maxConsonantFreq = Math.max(maxConsonantFreq, alphabetArray[i]);
    }
  }

  return maxVowelFreq + maxConsonantFreq;
}
// Time: O(n)
// Space: O(1)
