import { maxArea } from './maxArea';

describe('maxArea', () => {
  it('should find maximum area for basic case', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it('should handle two elements', () => {
    expect(maxArea([1, 1])).toBe(1);
    expect(maxArea([4, 3])).toBe(3);
  });

  it('should handle increasing heights', () => {
    expect(maxArea([1, 2, 3, 4, 5])).toBe(6);
  });

  it('should handle decreasing heights', () => {
    expect(maxArea([5, 4, 3, 2, 1])).toBe(6);
  });

  it('should handle all same heights', () => {
    expect(maxArea([3, 3, 3, 3, 3])).toBe(12);
  });

  it('should handle single element', () => {
    expect(maxArea([1])).toBe(0);
  });

  it('should handle two elements with different heights', () => {
    expect(maxArea([2, 1])).toBe(1);
    expect(maxArea([1, 2])).toBe(1);
  });

  it('should handle complex case', () => {
    expect(maxArea([1, 2, 4, 3])).toBe(4);
  });

  it('should handle edge case with zero heights', () => {
    expect(maxArea([0, 2])).toBe(0);
    expect(maxArea([2, 0])).toBe(0);
  });

  it('should handle large heights', () => {
    expect(maxArea([10, 1, 1, 10])).toBe(30);
  });
});
