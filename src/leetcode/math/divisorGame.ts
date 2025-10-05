export function divisorGame(n: number): boolean {
  let aTurn = true;
  for (let x = 1; x < n; x++) {
    if (n % x === 0) {
      n = n - x;
      x = 0;
      aTurn = !aTurn;
    }
  }
  return !aTurn;
}
