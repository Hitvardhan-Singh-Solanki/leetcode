import { maxAreaOfIsland } from './maxAreaOfIsland';

describe('maxAreaOfIsland', () => {
  describe('Basic functionality', () => {
    it('should find maximum area of island', () => {
      const grid = [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      ];
      expect(maxAreaOfIsland(grid)).toBe(6);
    });

    it('should handle single cell island', () => {
      expect(maxAreaOfIsland([[1]])).toBe(1);
      expect(maxAreaOfIsland([[0]])).toBe(0);
    });

    it('should handle multiple islands', () => {
      const grid = [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1],
      ];
      expect(maxAreaOfIsland(grid)).toBe(4);
    });
  });

  describe('Edge cases', () => {
    it('should handle all water', () => {
      expect(
        maxAreaOfIsland([
          [0, 0, 0],
          [0, 0, 0],
        ])
      ).toBe(0);
    });

    it('should handle all land', () => {
      expect(
        maxAreaOfIsland([
          [1, 1],
          [1, 1],
        ])
      ).toBe(4);
    });

    it('should handle single row', () => {
      expect(maxAreaOfIsland([[1, 0, 1, 1, 0]])).toBe(2);
    });

    it('should handle single column', () => {
      expect(maxAreaOfIsland([[1], [0], [1], [1]])).toBe(2);
    });
  });

  describe('Complex cases', () => {
    it('should handle L-shaped island', () => {
      const grid = [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ];
      expect(maxAreaOfIsland(grid)).toBe(5);
    });

    it('should handle diagonal islands (not connected)', () => {
      const grid = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      expect(maxAreaOfIsland(grid)).toBe(1);
    });

    it('should handle snake-shaped island', () => {
      const grid = [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 1],
      ];
      expect(maxAreaOfIsland(grid)).toBe(6);
    });

    it('should handle large grid', () => {
      const grid = Array(10)
        .fill(null)
        .map(() =>
          Array(10)
            .fill(null)
            .map((_, i) => i % 2)
        );
      expect(maxAreaOfIsland(grid)).toBeGreaterThan(0);
    });
  });

  describe('LeetCode examples', () => {
    it('should pass LeetCode test cases', () => {
      const grid1 = [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      ];
      expect(maxAreaOfIsland(grid1)).toBe(6);

      const grid2 = [[0, 0, 0, 0, 0, 0, 0, 0]];
      expect(maxAreaOfIsland(grid2)).toBe(0);
    });
  });
});
