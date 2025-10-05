export function partitionLabels(s: string): number[] {
  const lastIndexMap = new Map<string, number>();
  for (let i = 0; i < s.length; ++i) lastIndexMap.set(s[i], i);

  let endSoFar = 0;
  let size = 0;
  const res: number[] = [];

  for (let i = 0; i < s.length; ++i) {
    const char = s[i];
    size++;
    endSoFar = Math.max(endSoFar, lastIndexMap.get(char)!);
    if (i === endSoFar) {
      res.push(size);
      size = 0;
    }
  }

  return res;
}
