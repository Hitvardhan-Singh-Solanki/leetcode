export function strStr(haystack: string, needle: string): number {
  const haylength = haystack.length;
  const needlelength = needle.length;
  if (haylength < needlelength) return -1;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;
    while (j < needle.length && haystack.charAt(i + j) === needle.charAt(j))
      j++;
    if (j === needle.length) {
      return i;
    }
  }
  return -1;
}

export function strStrKMP(haystack: string, needle: string): number {
  const lps = [] as Array<number>;
  computeLPSArray(needle, needle.length, lps);
  return KMPSearch(needle, haystack, lps);
}

function KMPSearch(pattern: string, txt: string, lps: Array<number>): number {
  const M = pattern.length;
  const N = txt.length;
  let i = 0;
  let j = 0;
  const res = [];
  while (N - i >= M - j) {
    if (pattern.charAt(j) === txt.charAt(i)) {
      j++;
      i++;
    }
    if (j === M) {
      res.push(i - j);
      j = lps[j - 1];
    } else if (i < N && pattern.charAt(j) !== txt.charAt(i)) {
      if (j !== 0) j = lps[j - 1];
      else i = i + 1;
    }
  }
  return res.length === 0 ? -1 : res[0];
}

function computeLPSArray(
  pattern: string,
  patLength: number,
  lps: Array<number>
) {
  let len = 0;
  let i = 1;
  lps[0] = 0;
  while (i < patLength) {
    if (pattern.charAt(i) === pattern.charAt(len)) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) len = lps[len - 1];
      else {
        lps[i] = len;
        i++;
      }
    }
  }
}
