export function largestGoodInteger(num: string): string {
  let best = -1;

  for (let i = 0; i + 2 < num.length; i++) {
    const a = num[i];
    if (a === num[i + 1] && a === num[i + 2]) {
      const d = a.charCodeAt(0) - 48;
      if (d > best) {
        best = d;
        if (best === 9) break;
      }
    }
  }
  return best >= 0 ? String(best).repeat(3) : '';
}
