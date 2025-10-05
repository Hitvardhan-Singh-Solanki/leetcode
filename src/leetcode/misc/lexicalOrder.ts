export const lexicalOrder = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i + 1)
    .map(String)
    .sort()
    .map(Number);
