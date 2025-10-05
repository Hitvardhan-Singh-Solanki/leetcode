type Mapper = {
  [key: string]: number;
};

export function checkSubarraySum(nums: number[], k: number): boolean {
  let total = 0;
  const map: Mapper = { '0': -1 };
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
    map[total % k] ??= i;
    if (map[total % k] < i - 1) return true;
  }
  return false;
}

export function subarraysDivByK(nums: number[], k: number): number {
  const prefixModCount = new Array(k).fill(0);
  prefixModCount[0] = 1;

  let count = 0;

  for (let i = 0, sum = 0; i < nums.length; i++) {
    sum += nums[i];
    const mod = ((sum % k) + k) % k;

    count += prefixModCount[mod];
    prefixModCount[mod]++;
  }

  return count;
}

/**
 * k
 *        V true
 * [a,b,c,d,e,f,g,h,i,j]
 *          ^ false
 * a+b+c / k == true
 * b+c / k == false
 * b+c+d / k == true
 * c+d / k == true
 * d / k == false
 * [a,b,c] [b,c,d] [c,d]
 *
 * 0. take two pointers starting at index 0.
 * 1. check if the element is divisible by k?
 *      a. if it is, increment the true counter
 *      b. if is is not, increment the false counter
 */
