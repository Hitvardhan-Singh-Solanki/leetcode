import { myAtoi } from './atoi';

describe('myAtoi', () => {
  describe('Basic functionality', () => {
    it('should convert positive numbers', () => {
      expect(myAtoi('42')).toBe(42);
      expect(myAtoi('123')).toBe(123);
      expect(myAtoi('0')).toBe(0);
    });

    it('should convert negative numbers', () => {
      expect(myAtoi('-42')).toBe(-42);
      expect(myAtoi('-123')).toBe(-123);
      expect(myAtoi('-0')).toEqual(0);
    });

    it('should handle numbers with leading spaces', () => {
      expect(myAtoi('   42')).toBe(42);
      expect(myAtoi('   -42')).toBe(-42);
      expect(myAtoi('   +42')).toBe(42);
    });

    it('should handle numbers with trailing non-digits', () => {
      expect(myAtoi('42abc')).toBe(42);
      expect(myAtoi('42.5')).toBe(42);
      expect(myAtoi('42-5')).toBe(42);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      expect(myAtoi('')).toBe(0);
    });

    it('should handle only spaces', () => {
      expect(myAtoi('   ')).toBe(0);
    });

    it('should handle only signs', () => {
      expect(myAtoi('+')).toBe(0);
      expect(myAtoi('-')).toEqual(0);
    });

    it('should handle non-numeric strings', () => {
      expect(myAtoi('abc')).toBe(0);
      expect(myAtoi('words and 987')).toBe(0);
    });

    it('should handle mixed characters', () => {
      expect(myAtoi('+-12')).toBe(0);
      expect(myAtoi('+12')).toBe(12);
    });
  });

  describe('Integer overflow/underflow', () => {
    it('should clamp to INT_MAX', () => {
      expect(myAtoi('2147483647')).toBe(2147483647);
      expect(myAtoi('2147483648')).toBe(2147483647);
      expect(myAtoi('9999999999')).toBe(2147483647);
    });

    it('should clamp to INT_MIN', () => {
      expect(myAtoi('-2147483648')).toBe(-2147483648);
      expect(myAtoi('-2147483649')).toBe(-2147483648);
      expect(myAtoi('-9999999999')).toBe(-2147483648);
    });
  });

  describe('Complex cases', () => {
    it('should handle leading zeros', () => {
      expect(myAtoi('00042')).toBe(42);
      expect(myAtoi('-00042')).toBe(-42);
    });

    it('should handle very long numbers', () => {
      expect(myAtoi('12345678901234567890')).toBe(2147483647);
      expect(myAtoi('-12345678901234567890')).toBe(-2147483648);
    });

    it('should handle numbers with multiple signs', () => {
      expect(myAtoi('++42')).toBe(0);
      expect(myAtoi('--42')).toEqual(0);
      expect(myAtoi('-+42')).toBe(0);
    });

    it('should handle whitespace and signs', () => {
      expect(myAtoi('   +0 123')).toBe(0);
      expect(myAtoi('   -0 123')).toEqual(0);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      expect(myAtoi('42')).toBe(42);
      expect(myAtoi('   -42')).toBe(-42);
      expect(myAtoi('4193 with words')).toBe(4193);
      expect(myAtoi('words and 987')).toBe(0);
      expect(myAtoi('-91283472332')).toBe(-2147483648);
    });
  });
});
