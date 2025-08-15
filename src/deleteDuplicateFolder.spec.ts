import { deleteDuplicateFolder } from './deleteDuplicateFolder';

describe('deleteDuplicateFolder', () => {
  describe('basic cases', () => {
    it('should handle simple duplicate folders', () => {
      const paths = [['a'], ['c'], ['d'], ['a', 'b'], ['c', 'b'], ['d', 'a']];
      expect(deleteDuplicateFolder(paths)).toStrictEqual([['d'], ['d', 'a']]);
    });

    it('should preserve non-duplicate structures', () => {
      const paths = [['a', 'b'], ['c', 'd'], ['c'], ['a']];
      expect(deleteDuplicateFolder(paths)).toStrictEqual([
        ['c'],
        ['c', 'd'],
        ['a'],
        ['a', 'b'],
      ]);
    });
  });

  describe('edge cases', () => {
    it('should handle single path', () => {
      expect(deleteDuplicateFolder([['a', 'b', 'c']])).toStrictEqual([
        ['a'],
        ['a', 'b'],
        ['a', 'b', 'c'],
      ]);
    });
  });
});
