export function isSubsequence(s: string, t: string): boolean {
  if (t.length < s.length) return false;
  let pointera = 0;
  let pointerb = 0;
  while (pointerb < t.length && pointera <= s.length) {
    const elea = s[pointera];
    const eleb = t[pointerb];
    if (elea === eleb) {
      pointera++;
    }
    pointerb++;
  }

  if (pointera === s.length) return true;
  return false;
}

function isSubsequenceFollowUp(s: string, t: string): boolean {
  const indexMap: { [key: string]: number[] } = {};
  for (let i = 0; i < t.length; i++) {
    if (!indexMap[t[i]]) indexMap[t[i]] = [];
    indexMap[t[i]].push(i);
  }

  return isSubsequenceWithPreprocessing(s, indexMap);
}

function findNextIndexBinarySearch(indices: number[], currIdx: number): number {
  let left = 0;
  let right = indices.length - 1;
  while (left <= right) {
    const mid = (left + (right - left)) >> 1;
    if (indices[mid] > currIdx) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left < indices.length ? indices[left] : -1;
}

function isSubsequenceWithPreprocessing(
  s: string,
  indexMap: { [key: string]: number[] }
): boolean {
  let currentIndex = -1;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!indexMap[char]) return false;
    currentIndex = findNextIndexBinarySearch(indexMap[char], currentIndex);
    if (currentIndex === -1) return false;
  }
  return true;
}
