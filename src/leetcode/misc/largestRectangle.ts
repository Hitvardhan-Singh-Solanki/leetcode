export function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const histogram = new Array(cols).fill(0);
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === '1') {
        histogram[j] += 1;
      } else {
        histogram[j] = 0;
      }
    }
    maxArea = Math.max(maxArea, largestRectangleArea(histogram));
  }

  return maxArea;
}

function largestRectangleArea(heights: number[]): number {
  if (heights.length === 0) return 0;

  const stack: number[] = [];
  let maxArea = 0;
  let index = 0;

  while (index < heights.length) {
    const currHeight = heights[index];

    if (stack.length === 0 || currHeight >= heights[stack[stack.length - 1]]) {
      stack.push(index);
      index++;
    } else {
      const topIndex = stack.pop()!;
      const height = heights[topIndex];
      const width =
        stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
  }

  while (stack.length > 0) {
    const topIndex = stack.pop()!;
    const height = heights[topIndex];
    const width =
      stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, height * width);
  }

  return maxArea;
}
