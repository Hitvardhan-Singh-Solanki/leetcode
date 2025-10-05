export function removeStars(s: string): string {
  const stack = [];
  for (let i = s.length - 1; i > -1; i--) {
    if (stack[stack.length - 1] === '*' && s[i] !== '*') stack.pop();
    else stack.push(s[i]);
  }
  return stack.reverse().join('');
}
