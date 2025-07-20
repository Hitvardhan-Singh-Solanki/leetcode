export type Fn = (n: number, i: number) => any;

export function filter(arr: number[], fn: Fn): number[] {
  const res = arr.filter(fn);
  return res;
}
