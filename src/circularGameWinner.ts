export function findTheWinner(n: number, k: number): number {
  return helper(n, k) + 1;
}

function helper(n: number, k: number): number {
  if (n === 1) return 0;
  return (helper(n - 1, k) + k) % n;
}
