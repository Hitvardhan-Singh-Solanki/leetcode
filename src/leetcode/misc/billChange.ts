export function lemonadeChange(bills: number[]): boolean {
  const counts = [0, 0, 0];
  for (const bill of bills) {
    console.log(counts);
    switch (bill) {
      case 5:
        counts[0]++;
        break;
      case 10:
        if (counts[0] === 0) return false;
        counts[0]--;
        counts[1]++;
        break;
      case 20:
        if (counts[1] > 0 && counts[0] > 0) {
          counts[1]--;
          counts[0]--;
          counts[2]++;
        } else if (counts[0] >= 3) {
          counts[0] -= 3;
          counts[2]++;
        } else {
          return false;
        }
        break;
      default:
        throw Error('should not reach here');
    }
  }

  return true;
}
