export function minSum(nums1: number[], nums2: number[]): number {
  const [sum1, zeros1] = findZerosAndSum(nums1);
  const [sum2, zeros2] = findZerosAndSum(nums2);

  if (sum1 < sum2 && zeros1 !== 0) return sum2;
  if (sum2 < sum1 && zeros2 !== 0) return sum1;
  if (sum1 === sum2) return sum1;

  return -1;
}

function findZerosAndSum(nums: number[]): [number, number] {
  let zeros = 0;
  const sum = nums.reduce((acc, val) => {
    if (val === 0) {
      val = 1;
      zeros++;
    }
    return (acc += val);
  }, 0);

  return [sum, zeros];
}
