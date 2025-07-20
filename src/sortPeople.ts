export function sortPeople(names: string[], heights: number[]): string[] {
  return names
    .map((n, i) => ({ n, h: heights[i] }))
    .sort((a, b) => b.h - a.h)
    .map((person) => person.n);
}
