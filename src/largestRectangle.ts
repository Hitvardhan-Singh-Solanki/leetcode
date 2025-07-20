import { Stack } from './stack';

export function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const histogram = new Array(cols).fill(0);
  const maxArea = largestRectangleArea(histogram);
  console.log(maxArea);
  return 0;
}

function largestRectangleArea(heights: number[]): number {
  const stack: Stack<number> = new Stack<number>();
  let maxArea = 0;
  let index = 0;

  while (index < heights.length) {
    const currHeight = heights[index];
    if (stack.length === 0 || currHeight >= heights[stack.peek()!]) {
      stack.push(currHeight);
      index++;
    } else {
      const height = heights[stack.pop()!];
      const width = stack.length === 0 ? index : index - stack.peek()! - 1;
      maxArea = Math.max(maxArea, height * width);
    }
  }

  while (stack.length > 0) {
    const height = heights[stack.pop()!];
    const width = stack.length === 0 ? index : index - stack.peek()! - 1;
    maxArea = Math.max(maxArea, height * width);
  }

  return maxArea;
}
