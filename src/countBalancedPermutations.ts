const MOD = 1_000_000_007;

export const countBalancedPermutations = (num: string): number => {
  const length = num.length;

  const digitCount = Array<number>(10).fill(0);
  let totalDigitSum = 0;

  for (const char of num) {
    const digit = parseInt(char);
    digitCount[digit]++;
    totalDigitSum += digit;
  }

  // if sum is odd return 0;
  if (totalDigitSum % 2 !== 0) return 0;

  const memo = new Map<string, number>();

  const evenPositions = Math.floor(length / 2);
  const oddPositions = length - evenPositions;
  const targetHalfSum = totalDigitSum / 2;

  return dfs(9, oddPositions, evenPositions, targetHalfSum, memo, digitCount);
};

function comb(n: number, r: number): number {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n - r) r = n - r;

  let result = BigInt(1);
  for (let i = 0; i < r; i++) {
    result *= BigInt(n - i);
    result /= BigInt(i + 1);
  }
  return Number(result % BigInt(MOD));
}

function dfs(
  digit: number,
  oddSlots: number,
  evenSlots: number,
  targetSum: number,
  memo: Map<string, number>,
  digitCount: number[]
): number {
  if (oddSlots === 0 && evenSlots === 0 && targetSum === 0) return 1;
  if (digit < 0 || oddSlots < 0 || evenSlots < 0 || targetSum < 0) return 0;

  const memoKey = `${digit},${oddSlots},${evenSlots},${targetSum}`;
  if (memo.has(memoKey)) return memo.get(memoKey)!;

  let waysToArrange = 0;

  for (let oddUsed = 0; oddUsed <= digitCount[digit]; oddUsed++) {
    const evenUsed = digitCount[digit] - oddUsed;

    const waysToPlace =
      (BigInt(comb(oddSlots, oddUsed)) * BigInt(comb(evenSlots, evenUsed))) %
      BigInt(MOD);

    const remainingWays = BigInt(
      dfs(
        digit - 1,
        oddSlots - oddUsed,
        evenSlots - evenUsed,
        targetSum - digit * oddUsed,
        memo,
        digitCount
      )
    );

    waysToArrange =
      (waysToArrange + Number((waysToPlace * remainingWays) % BigInt(MOD))) %
      MOD;
  }

  memo.set(memoKey, waysToArrange);
  return waysToArrange;
}
