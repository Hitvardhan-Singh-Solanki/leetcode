export function largestGoodInteger(num: string): string {
  const numSet = new Set();
  let res = '';
  for (let i = 9; i >= 0; i--) numSet.add(String(i).repeat(3));
  for (let i = 0; i < num.length - 2; i++) {
    let check = num[i];
    for (let j = i + 1; j < i + 3; j++) check += num[j];
    if (numSet.has(check) && Number(check) >= Number(res)) res = check;
  }

  return res;
}
