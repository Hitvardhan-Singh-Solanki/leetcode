export function maximumGain(s: string, x: number, y: number): number {
  function removePairs(pairs: string, score: number): number {
    let res = 0;
    const stack: string[] = [];
    for (const ch of s) {
      if (
        ch === pairs[1] &&
        stack.length &&
        stack[stack.length - 1] === pairs[0]
      ) {
        stack.pop();
        res += score;
      } else stack.push(ch);
    }
    s = stack.join('');
    return res;
  }

  let res = 0;
  const pair = x > y ? 'ab' : 'ba';
  res += removePairs(pair, Math.max(x, y));
  res += removePairs(pair.split('').reverse().join(''), Math.min(x, y));
  return res;
}
