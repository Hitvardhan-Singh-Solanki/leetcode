export function areaOfMaxDiagonal(dimensions: number[][]): number {
  return dimensions.reduce(
    ({ a, d }, [l, w]) =>
      l * l + w * w > d || (l * l + w * w === d && l * w > a)
        ? {
            a: l * w,
            d: l * l + w * w,
          }
        : { a, d },
    {
      a: 0,
      d: 0,
    }
  ).a;
}
