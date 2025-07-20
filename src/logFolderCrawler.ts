import { Stack } from './stack';

export function minOperations(logs: string[]): number {
  const stack: string[] = [];
  for (let i = 0; i < logs.length; i++) {
    const op = logs[i];
    if (op === '../') stack.length > 0 && stack.pop();
    else if (op === './') continue;
    else stack.push(op);
  }
  return stack.length;
}
