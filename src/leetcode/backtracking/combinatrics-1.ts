/**
Okay, let's start with combinatorics.

Core Concepts & Formulas 🔢
Combinatorics is the study of counting. It helps us figure out the number of possible outcomes for a given event. The key is understanding when to use permutations, combinations, and the basic counting principles.

Rule of Sum: If there are A ways to do one thing and B ways to do another, and you can't do both at the same time, then there are A+B ways to choose one of the options.

Rule of Product: If there are A ways to do one thing and B ways to do another, then there are A×B ways to do both.

Permutations: This is for problems where order matters. Think of arranging objects in a line or assigning specific roles. The formula for the number of permutations of n items taken k at a time is:
P(n,k)= 
(n−k)!
n!

For example, if you have 5 people and want to choose 3 for the roles of president, vice-president, and secretary, the order matters.

Combinations: This is for problems where order does not matter. Think of picking a team or selecting a group of objects. The formula for the number of combinations of n items taken k at a time is:
C(n,k)= 
k!(n−k)!
n!

For example, if you have 5 people and want to choose 3 to be on a committee, the order doesn't matter.

Key Problem-Solving Technique: Backtracking 🌲
While the formulas are important, many FAANG-level combinatorics problems require a deeper, more programmatic approach. This is where backtracking comes in.

Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time. If at any point it becomes clear that the current path cannot lead to a valid solution, we backtrack and try a different path.

Think of it like navigating a maze.  You take a path, and if it's a dead end, you go back to the last fork in the road and try another path. This process of exploring and then reverting is the essence of backtracking.

Common problems solved with backtracking include:

Generating permutations, combinations, and subsets.

Solving Sudoku puzzles.

Finding all paths in a graph.

Practice Problem 💡
Problem: Given a collection of distinct integers, return all possible unique subsets (the power set).

Example:
Input: [1, 2, 3]
Output:
[ [], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3] ]

Hint: This can be solved with a recursive backtracking approach. At each step, you have two choices for the current element:

Include it in the current subset.

Don't include it and move to the next element.
 */

function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(start: number, currentSubset: number[]) {
    result.push([...currentSubset]);

    for (let i = start; i < nums.length; i++) {
      currentSubset.push(nums[i]);
      backtrack(i + 1, currentSubset);
      currentSubset.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// Example usage:
console.log(subsets([1, 2, 3]));
// Output: [ [], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3] ]
