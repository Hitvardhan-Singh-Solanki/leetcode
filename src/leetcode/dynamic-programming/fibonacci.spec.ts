import { fib } from './fibonacci';

describe('fib', () => {
  describe('Basic cases', () => {
    it('should return correct fibonacci numbers', () => {
      expect(fib(0)).toBe(0);
      expect(fib(1)).toBe(1);
      expect(fib(2)).toBe(1);
      expect(fib(3)).toBe(2);
      expect(fib(4)).toBe(3);
      expect(fib(5)).toBe(5);
    });

    it('should handle larger fibonacci numbers', () => {
      expect(fib(6)).toBe(8);
      expect(fib(7)).toBe(13);
      expect(fib(8)).toBe(21);
      expect(fib(9)).toBe(34);
      expect(fib(10)).toBe(55);
    });
  });

  describe('Edge cases', () => {
    it('should handle n = 0', () => {
      expect(fib(0)).toBe(0);
    });

    it('should handle n = 1', () => {
      expect(fib(1)).toBe(1);
    });

    it('should handle n = 2', () => {
      expect(fib(2)).toBe(1);
    });
  });

  describe('Performance cases', () => {
    it('should handle larger values efficiently', () => {
      expect(fib(20)).toBe(6765);
      expect(fib(30)).toBe(832040);
    });

    it('should handle the constraint limit', () => {
      expect(fib(30)).toBe(832040);
    });
  });

  describe('Mathematical properties', () => {
    it('should satisfy fibonacci property F(n) = F(n-1) + F(n-2)', () => {
      for (let i = 2; i <= 20; i++) {
        expect(fib(i)).toBe(fib(i - 1) + fib(i - 2));
      }
    });

    it('should have correct sequence', () => {
      const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
      for (let i = 0; i < expected.length; i++) {
        expect(fib(i)).toBe(expected[i]);
      }
    });
  });
});
