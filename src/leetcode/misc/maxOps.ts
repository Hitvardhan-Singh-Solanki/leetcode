export function maxOperations(nums: number[], k: number): number {
  const map: { [key: number]: number } = {};
  let res = 0;

  for (const i of nums) {
    const x = k - i;
    if (map[x] >= 1) {
      res++;
      map[x]--;
    } else {
      map[i] ? map[i]++ : (map[i] = 1);
    }
  }

  return res;
}
