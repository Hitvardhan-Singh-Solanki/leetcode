export function minSwaps(nums: number[]): number {
  const oneCount = nums.reduce((a, v) => (v === 1 ? ++a : a), 0);

  if (oneCount === 0 || oneCount === nums.length) return 0;

  let maxOnesInWindow = 0;
  let currentOnesInWindow = 0;

  for (let i = 0; i < oneCount; i++) {
    if (nums[i] === 1) {
      currentOnesInWindow++;
    }
  }

  maxOnesInWindow = currentOnesInWindow;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] === 1) {
      currentOnesInWindow--;
    }
    if (nums[(i + oneCount - 1) % nums.length] === 1) {
      currentOnesInWindow++;
    }
    maxOnesInWindow = Math.max(maxOnesInWindow, currentOnesInWindow);
  }

  return oneCount - maxOnesInWindow;
}
