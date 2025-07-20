export function removeStones(stones: number[][]): number {
  const visited = new Set<string>();
  let numOfConnectedComponents = 0;
  function dfs(posx: number, posy: number): void {
    const key = `${posx},${posy}`;
    if (visited.has(key)) return;

    visited.add(key);

    for (const [x, y] of stones) {
      if (x === posx || y === posy) {
        dfs(x, y);
      }
    }
  }

  for (const [posx, posy] of stones) {
    const key = `${posx},${posy}`;
    if (!visited.has(key)) {
      dfs(posx, posy);
      numOfConnectedComponents++;
    }
  }

  return stones.length - numOfConnectedComponents;
}
