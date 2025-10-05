export function longestValidParentheses(s: string): number {
  let max = 0;
  if (s.length === 0) return max;
  const stack = [-1];

  let idx = 0;
  while (idx < s.length) {
    if (s[idx] === '(') stack.push(idx);
    else {
      stack.pop();
      if (stack.length === 0) stack.push(idx);
      else max = Math.max(max, idx - stack[stack.length - 1]);
    }
    idx++;
  }
  return max;
}
