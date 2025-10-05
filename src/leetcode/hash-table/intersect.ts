// What if the given array is already sorted? How would you optimize your algorithm?

// O(n+m) O(n) where n is the length of the largest array
export function intersect(nums1: number[], nums2: number[]): number[] {
  const seen: { [key: number]: number } = {};
  const res: number[] = [];
  for (const val of nums1) {
    if (seen[val]) seen[val]++;
    else seen[val] = 1;
  }

  for (const val of nums2) {
    if (seen[val] && seen[val] > 0) {
      seen[val]--;
      res.push(val);
    }
  }
  return res;
}

// O(n) O(1) where n is the length the length of the smallest array
export function intersectSorted(nums1: number[], nums2: number[]): number[] {
  let i = 0;
  let j = 0;
  const res: number[] = [];

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      res.push(nums1[i]);
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return res;
}
