export function sortJumbled(mapping: number[], nums: number[]): number[] {
  const temp: { [key: number]: number[] } = {};
  for (const num of nums) {
    const strNum = num.toString().split('');
    let tempNumberStr = '';
    for (const digit of strNum) {
      tempNumberStr += mapping[Number(digit)];
    }
    const tempNumber = Number(tempNumberStr);
    if (temp[tempNumber]) {
      temp[tempNumber].push(Number(strNum.join('')));
    } else {
      temp[tempNumber] = [Number(strNum.join(''))];
    }
  }

  const keys = Object.keys(temp);
  keys.sort((a, b) => Number(a) - Number(b));

  const sortedArray: number[] = [];
  for (const key of keys) {
    const numkey = Number(key);
    sortedArray.push(...temp[numkey]);
  }

  return sortedArray;
}
