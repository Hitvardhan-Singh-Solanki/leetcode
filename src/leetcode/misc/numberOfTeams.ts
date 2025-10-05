/**
Approach 1: Dynamic Programming (Memoization)
Intuition
The brute force approach to solving this problem involves checking all possible combinations of rating 
and counting those that meet our conditions. 

However, such an approach would have a time complexity of O(n^3), 
which would not satisfy the given constraints.

Instead of using nested loops to examine all possible combinations of soldiers, 
we can simplify the problem by breaking it down into smaller sub-problems. 
The core idea is to determine how many teams each soldier can join and then sum these totals 
to get the final answer.

We can achieve this by employing recursion. 

* Specifically, we define a function called 
countIncreasingTeams that takes two parameters: 
an index from the rating array 
and the number of members currently in the team. 
This function will return the total number of valid teams that can be formed 
starting from the given index with the current team size.

For each soldier, 
the function will explore all potential next soldiers who can be added to the team, 
provided they satisfy the rating condition. 
It will then recursively count the number of valid teams that can be formed from this new state. 
The recursion will terminate when the team has reached the maximum size of three members. 
At each step, the function accumulates the number of valid teams and returns this count.

During the recursion, we might encounter the same sub-problem multiple times at different stages, which are known as overlapping sub-problems. To optimize our solution and avoid redundant computations, we use memoization. This technique involves storing the result of each sub-problem the first time it is computed so that when we encounter the same sub-problem again, we can retrieve the result from a cache rather than recomputing it.

Since we need to count both increasing and decreasing teams, we set up two separate recursive functions, each with its cache. Each sub-problem is uniquely identified by two states: the current index and the size of the team already formed.

To get the final result, we initiate our recursive functions starting from each index in the rating array. By summing the number of teams returned by each recursion, we obtain the total number of valid teams.

Algorithm
Main method numTeams:

Initialize:
n as the length of rating.
teams to store the total number of possible teams.
two arrays increasingCache and decreasingCache of size n×4 to serve as cache for the memoization.
Loop over the array rating. For each index startIndex:
Call countIncreasingTeams and countDecreasingTeams with startIndex. Add their results to teams.
Return teams.
Helper method countIncreasingTeams:

Define a method countIncreasingTeams with parameters: rating, currentIndex, teamSize and the cache increasingCache.
Initialize n as the length of rating.
If currentIndex is equal to n, return 0.
If teamSize is equal to 3, return 1.
If increasingCache already contains an entry with the current state, return it.
Initialize a variable validTeams to 0.
Loop over all indices from currentIndex + 1 to the end of the array. For each index nextIndex:
If rating[nextIndex] is greater than rating[currentIndex], call countIncreasingTeams with nextIndex and teamSize incremented by 1.
Cache validTeams with the current state in increasingCache and return it.
Helper method countDecreasingTeams:

Define a method countDecreasingTeams with parameters: rating, currentIndex, teamSize and the cache decreasingCache.
This method is exactly the same as countIncreasingTeams except for majorly one thing:
We check whether rating[nextIndex] is less than rating[currentIndex] to call countDecreasingTeams.
 */

export function numTeams(rating: number[]): number {
  const n = rating.length;
  let teams = 0;
  const increasingCache = Array.from({ length: n }, () =>
    new Array(4).fill(-1)
  );
  const decreasingCache = Array.from({ length: n }, () =>
    new Array(4).fill(-1)
  );

  for (let i = 0; i < n; i++) {
    teams +=
      countIncreasingTeams(rating, i, 1, increasingCache) +
      countDecreasingTeams(rating, i, 1, decreasingCache);
  }

  return teams;
}

function countIncreasingTeams(
  rating: number[],
  ratingIndex: number,
  currentMembersOfTheTeams: number,
  increasingCache: number[][]
): number {
  const n = rating.length;
  if (ratingIndex === n) return 0;
  if (currentMembersOfTheTeams === 3) return 1;

  if (increasingCache[ratingIndex][currentMembersOfTheTeams] !== -1) {
    return increasingCache[ratingIndex][currentMembersOfTheTeams];
  }

  let validTeams = 0;
  for (let nextIndex = ratingIndex + 1; nextIndex < n; nextIndex++) {
    if (rating[nextIndex] > rating[ratingIndex]) {
      validTeams += countIncreasingTeams(
        rating,
        nextIndex,
        currentMembersOfTheTeams + 1,
        increasingCache
      );
    }
  }
  increasingCache[ratingIndex][currentMembersOfTheTeams] = validTeams;

  return validTeams;
}

function countDecreasingTeams(
  rating: number[],
  ratingIndex: number,
  currentMembersOfTheTeams: number,
  decreasingCache: number[][]
): number {
  const n = rating.length;
  if (ratingIndex === n) return 0;
  if (currentMembersOfTheTeams === 3) return 1;

  if (decreasingCache[ratingIndex][currentMembersOfTheTeams] !== -1) {
    return decreasingCache[ratingIndex][currentMembersOfTheTeams];
  }

  let validTeams = 0;

  for (let nextIndex = ratingIndex + 1; nextIndex < n; nextIndex++) {
    if (rating[nextIndex] < rating[ratingIndex]) {
      validTeams += countDecreasingTeams(
        rating,
        nextIndex,
        currentMembersOfTheTeams + 1,
        decreasingCache
      );
    }
  }

  decreasingCache[ratingIndex][currentMembersOfTheTeams] = validTeams;
  return validTeams;
}
