export function minimumPushes(word: string): number {
  if (word.length <= 8) return word.length;
  const freq = countChars(word);
  return mapper(freq);
}

function mapper(heap: number[]): number {
  let res = 0;
  let multiplier = 1;
  for (let i = 0; i < heap.length; i++) {
    const weight = heap[i];
    if (i >= 8) multiplier = Math.floor(i / 8) + 1;
    res += multiplier * weight;
  }

  return res;
}

function countChars(word: string): Array<number> {
  const map: Array<number> = new Array(26).fill(0);
  for (const ch of word) map[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  map.sort((a, b) => b - a);
  return map;
}
