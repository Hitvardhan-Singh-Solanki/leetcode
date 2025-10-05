import { lexicalOrder } from './lexicalOrder';

describe('lexicalOrder', () => {
  it('return expected array of numbers', () => {
    const res = lexicalOrder(13);
    expect(res).toEqual([1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
