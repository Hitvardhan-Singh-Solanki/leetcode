import { countHillValley } from './countHillValley';

describe('count hill valley', () => {
  it('should do something', () => {
    let nums = [2, 4, 1, 1, 6, 5];
    let res = countHillValley(nums);

    expect(res).toBe(3);

    nums = [6, 6, 5, 5, 4, 1];
    res = countHillValley(nums);

    expect(res).toBe(0);

    nums = [5, 7, 7, 1, 7];
    res = countHillValley(nums);

    expect(res).toBe(2);
  });
});
