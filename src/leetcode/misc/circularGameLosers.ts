export function circularGameLosers(n: number, k: number): number[] {
  const received = new Set();
  let currentFriend = 1;
  let steps = 1;

  while (!received.has(currentFriend)) {
    received.add(currentFriend);
    currentFriend = ((currentFriend + steps * k - 1) % n) + 1;
    steps++;
  }

  const losers: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (!received.has(i)) {
      losers.push(i);
    }
  }

  return losers;
}
