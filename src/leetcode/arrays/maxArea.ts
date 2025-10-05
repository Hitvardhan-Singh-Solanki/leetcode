export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  while (left <= right) {
    const tempA = calculateArea(left, right, height);
    maxArea = Math.max(tempA, maxArea);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxArea;
}

function calculateArea(l: number, r: number, heights: number[]): number {
  const horizontal = r - l;
  const vertical = heights[r] < heights[l] ? heights[r] : heights[l];
  return horizontal * vertical;
}
