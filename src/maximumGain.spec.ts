import { maximumGain } from './maximumGains';

describe('maxgains', () => {
  it('should do something', () => {
    const s = 'cdbcbbaaabab',
      x = 4,
      y = 5;
    let res = maximumGain(s, x, y);

    expect(res).toBe(19);
  });
});
