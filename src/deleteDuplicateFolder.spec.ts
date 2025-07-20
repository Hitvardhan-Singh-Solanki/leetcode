import { deleteDuplicateFolder } from './deleteDuplicateFolder';

describe('deleteDuplicateFolder', () => {
  it('should return expected values', () => {
    let paths = [['a'], ['c'], ['d'], ['a', 'b'], ['c', 'b'], ['d', 'a']];
    let res = deleteDuplicateFolder(paths);
    expect(res).toStrictEqual([['d'], ['d', 'a']]);

    paths = [
      ['a'],
      ['c'],
      ['a', 'b'],
      ['c', 'b'],
      ['a', 'b', 'x'],
      ['a', 'b', 'x', 'y'],
      ['w'],
      ['w', 'y'],
    ];

    res = deleteDuplicateFolder(paths);
    expect(res).toStrictEqual([['c'], ['c', 'b'], ['a'], ['a', 'b']]);

    paths = [['a', 'b'], ['c', 'd'], ['c'], ['a']];
    res = deleteDuplicateFolder(paths);
    expect(res).toStrictEqual([['c'], ['c', 'd'], ['a'], ['a', 'b']]);
  });
});
