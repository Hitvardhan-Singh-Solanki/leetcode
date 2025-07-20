export function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number
): number {
  let prices = Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; i++) {
    const tempPrices = [...prices];
    for (const [u, v, w] of flights) {
      if (prices[u] !== Infinity && prices[u] + w < tempPrices[v]) {
        tempPrices[v] = prices[u] + w;
      }
    }
    prices = tempPrices;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}
