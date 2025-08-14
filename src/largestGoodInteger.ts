export function largestGoodInteger(num: string): string {
  let maxGoodInteger = '';
  let currentGoodInteger = '';

  for (let i = 0; i < num.length; i++) {
    currentGoodInteger += num[i];
    if (currentGoodInteger.length === 3) {
      if (
        currentGoodInteger[0] === currentGoodInteger[1] &&
        currentGoodInteger[1] === currentGoodInteger[2]
      ) {
        if (currentGoodInteger > maxGoodInteger) {
          maxGoodInteger = currentGoodInteger;
        }
      }
      currentGoodInteger = currentGoodInteger.slice(1);
    }
  }
  return maxGoodInteger;
}
