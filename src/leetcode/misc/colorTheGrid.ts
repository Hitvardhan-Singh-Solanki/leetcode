const MOD = 1_000_000_007;

type Color = 'R' | 'G' | 'B';
type State = Color[];

export function colorTheGrid(m: number, n: number): number {
  const validStates = generateValidStates(m);
  const stateCount = validStates.length;

  // Precompute transitions for fast lookup
  const transitions: number[][] = Array.from({ length: stateCount }, () => []);

  for (let i = 0; i < stateCount; i++) {
    for (let j = 0; j < stateCount; j++) {
      if (canTransition(validStates[i], validStates[j])) {
        transitions[i].push(j);
      }
    }
  }

  // DP array: dp[col][stateIndex] = number of ways to color up to column 'col' ending with 'stateIndex'
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(stateCount).fill(0)
  );

  // Base case: first column can be any valid state
  for (let i = 0; i < stateCount; i++) {
    dp[1][i] = 1;
  }

  // Fill DP for columns 2 to n
  for (let col = 2; col <= n; col++) {
    for (let s2 = 0; s2 < stateCount; s2++) {
      let total = 0;
      for (const s1 of transitions[s2]) {
        total = (total + dp[col - 1][s1]) % MOD;
      }
      dp[col][s2] = total;
    }
  }

  // Sum all ways for the last column
  let answer = 0;
  for (let i = 0; i < stateCount; i++) {
    answer = (answer + dp[n][i]) % MOD;
  }

  return answer;
}

function generateValidStates(
  m: number,
  colors: Color[] = ['R', 'G', 'B']
): State[] {
  const validStates: State[] = [];
  backtrack(m, [], colors, validStates);
  return validStates;
}

function backtrack(
  m: number,
  current: Color[],
  colors: Color[],
  validStates: State[]
) {
  if (current.length === m) {
    validStates.push([...current]);
    return;
  }

  for (const c of colors) {
    if (current.length === 0 || current[current.length - 1] !== c) {
      current.push(c);
      backtrack(m, current, colors, validStates);
      current.pop();
    }
  }
}

function canTransition(s1: State, s2: State): boolean {
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] === s2[i]) return false;
  }
  return true;
}
