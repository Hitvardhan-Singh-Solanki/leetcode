/**
 * Determines whether the given numbers can be combined with +, -, *, and / to produce 24.
 *
 * Tries all permutations of the input numbers and recursively combines pairs with the four
 * basic operators (respecting commutativity for + and *). Uses a small epsilon (1e-6)
 * for floating-point comparison against the target value 24.
 *
 * @param cards - Array of numbers to use; expected to contain four numbers for the classic 24 game.
 * @returns True if some ordering and combination of the numbers evaluates to 24, otherwise false.
 */
export function judgePoint24(cards: number[]): boolean {
  // The target value is 24.
  const TARGET = 24;

  // Epsilon value for floating point comparison.
  const EPSILON = 1e-6;

  // The operators that can be used.
  const OPERATORS = ['+', '-', '*', '/'];

  // Helper function to generate permutations.
  // This function takes an array of numbers, a partial permutation, a boolean array
  // to track which numbers have been used, and a list of permutations as input.
  // The function recursively generates all permutations of the input array and
  // adds them to the list of permutations.
  function generatePermutations(
    nums: number[],
    perm: number[],
    used: boolean[],
    result: number[][]
  ): void {
    // If the permutation is complete, then add it to the list of permutations.
    if (perm.length === nums.length) {
      result.push([...perm]);
      return;
    }

    // For each number that has not been used, add it to the permutation and
    // recursively generate all permutations of the remaining numbers.
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      perm.push(nums[i]);
      generatePermutations(nums, perm, used, result);
      perm.pop();
      used[i] = false;
    }
  }

  // Helper function to evaluate expressions.
  // This function takes an array of numbers and returns true if the expression
  // evaluates to 24 and false otherwise.
  function evaluate(nums: number[]): boolean {
    // If the array only has one number, then check if the number is close to 24.
    if (nums.length === 1) {
      return Math.abs(nums[0] - TARGET) < EPSILON;
    }

    // For each pair of numbers in the array, try all possible operations.
    // If any of the operations result in an expression that evaluates to 24,
    // then return true.
    const len = nums.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const a = nums[i];
        const b = nums[j];
        const remaining = nums.filter((_, index) => index !== i && index !== j);

        // Try all possible results from combining a and b.
        const candidates: number[] = [
          a + b,
          a * b,
          a - b,
          b - a,
        ];
        if (Math.abs(b) > EPSILON) candidates.push(a / b);
        if (Math.abs(a) > EPSILON) candidates.push(b / a);

        for (const value of candidates) {
          if (evaluate([...remaining, value])) {
            return true;
          }
        }
      }
    }

    // The expression does not evaluate to 24.
    return false;
  }

  // Generate permutations of the input numbers.
  const permutations: number[][] = [];
  generatePermutations(
    cards,
    [],
    new Array(cards.length).fill(false),
    permutations
  );

  // Check each permutation.
  for (const permutation of permutations) {
    if (evaluate(permutation)) {
      return true;
    }
  }

  // The expression does not evaluate to 24.
  return false;
}
