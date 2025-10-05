export function passThePillow(n: number, time: number): number {
  const fullRounds = time / (n - 1);
  const extraTime = time % (n - 1);
  if ((fullRounds & 1) == 0) {
    return extraTime + 1;
  } else {
    return n - extraTime;
  }
}
