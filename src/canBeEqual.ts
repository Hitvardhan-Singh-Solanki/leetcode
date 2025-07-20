export function canBeEqual(target: number[], arr: number[]): boolean {
  const freq = new Map<number, number>();

  for (const k of target) {
    freq.set(k, freq.get(k) ?? 0 + 1);
  }

  for (const k of arr) {
    if (freq.has(k)) {
      freq.set(k, freq.get(k)! - 1);
      if (freq.get(k)! < 0) {
        return false;
      }
    } else return false;
  }

  for (const v of Object.values(freq)) if (v !== 0) return false;

  return true;
}
