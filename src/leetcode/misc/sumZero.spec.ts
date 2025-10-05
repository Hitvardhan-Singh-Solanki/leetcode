import { sumZero } from './sumZero';

describe('sumZero', () => {
  function isValidResult(result: number[], n: number): boolean {
    if (result.length !== n) return false;
    if (result.reduce((a, b) => a + b, 0) !== 0) return false;
    const set = new Set(result);
    if (set.size !== n) return false;
    return true;
  }

  test('should return array with one element 0 when n=1', () => {
    const result = sumZero(1);
    expect(result).toEqual([0]);
    expect(isValidResult(result, 1)).toBe(true);
  });

  test('should return valid array for n=2', () => {
    const result = sumZero(2);
    expect(isValidResult(result, 2)).toBe(true);
  });

  test('should return valid array for n=3', () => {
    const result = sumZero(3);
    expect(isValidResult(result, 3)).toBe(true);
  });

  test('should return valid array for n=5', () => {
    const result = sumZero(5);
    expect(isValidResult(result, 5)).toBe(true);
  });

  test('should return valid array for n=10 (even number)', () => {
    const result = sumZero(10);
    expect(isValidResult(result, 10)).toBe(true);
  });

  test('should return valid array for n=9 (odd number)', () => {
    const result = sumZero(9);
    expect(isValidResult(result, 9)).toBe(true);
  });

  test('should handle large n like 1000', () => {
    const result = sumZero(1000);
    expect(isValidResult(result, 1000)).toBe(true);
  });
});
