import { wordCountEngine } from './wordCountEngine';

describe('wordCountEngine', () => {
  it('should do something', () => {
    let s =
      'Every book is a quotation; and every      house is a quotation out of all forests, and mines,  and stone quarries; and every man is a quotation from all his ancestors. ';
    let res = wordCountEngine(s);

    expect(res).toStrictEqual([
      ['and', '4'],
      ['every', '3'],
      ['is', '3'],
      ['a', '3'],
      ['quotation', '3'],
      ['all', '2'],
      ['book', '1'],
      ['house', '1'],
      ['out', '1'],
      ['of', '1'],
      ['forests', '1'],
      ['mines', '1'],
      ['stone', '1'],
      ['quarries', '1'],
      ['man', '1'],
      ['from', '1'],
      ['his', '1'],
      ['ancestors', '1'],
    ]);
  });
});
