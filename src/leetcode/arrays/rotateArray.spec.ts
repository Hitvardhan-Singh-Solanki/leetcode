import { rotate } from './rotateArray';

describe('rotate', () => {
  it('should rotate array by 1 step', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    rotate(nums, 1);
    expect(nums).toEqual([7, 1, 2, 3, 4, 5, 6]);
  });

  it('should rotate array by 3 steps', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    rotate(nums, 3);
    expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });

  it('should handle k larger than array length', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    rotate(nums, 10);
    expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });

  it('should handle single element array', () => {
    const nums = [1];
    rotate(nums, 1);
    expect(nums).toEqual([1]);
  });

  it('should handle two element array', () => {
    const nums = [1, 2];
    rotate(nums, 1);
    expect(nums).toEqual([2, 1]);
  });

  it('should handle k = 0', () => {
    const nums = [1, 2, 3, 4, 5];
    rotate(nums, 0);
    expect(nums).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle negative k', () => {
    const nums = [1, 2, 3, 4, 5];
    rotate(nums, -1);
    // For negative k, we need to handle it properly
    // -1 % 5 = -1, so we need to convert to positive equivalent
    expect(nums).toEqual([2, 3, 4, 5, 1]);
  });

  it('should handle array length equal to k', () => {
    const nums = [1, 2, 3, 4, 5];
    rotate(nums, 5);
    expect(nums).toEqual([1, 2, 3, 4, 5]);
  });
});
