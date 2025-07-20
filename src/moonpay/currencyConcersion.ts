/**
 * Currency Conversion API
 * Supports direct and indirect conversions
 * Handles unknown currencies and missing paths
 * Optimized for repeated queries using memoization
 */

export type ExchangeRate = {
  from: string;
  to: string;
  rate: number;
};

export type ExchangeFactor = Map<string, number>;
export type ProcessedExchangeRates = Map<string, ExchangeFactor>;
export type Edge = { from: string; to: string; weight: number };

export class CurrencyConversion {
  private processedExchangeRates: ProcessedExchangeRates;
  private supportedCurrencies: Set<string>;
  private logGraph: Edge[] = [];

  constructor(exchangeRates: ExchangeRate[]) {
    this.supportedCurrencies = new Set<string>();
    this.processedExchangeRates = this.processExchangeRates(exchangeRates);
    this.buildLogGraph(exchangeRates);
  }

  convert(from: string, to: string, amount: number): number | null {
    from = from.toUpperCase();
    to = to.toUpperCase();

    if (
      !this.supportedCurrencies.has(from) ||
      !this.supportedCurrencies.has(to)
    ) {
      console.error(`Unknown currency: ${from} or ${to}`);
      return null;
    }

    const result = this.dfs(from, to, amount, new Set());
    if (result === null) {
      console.log(`No conversion path found from ${from} to ${to}`);
    } else {
      console.log(`${amount} ${from} = ${result.toFixed(2)} ${to}`);
    }

    return result;
  }

  detectArbitrage(): string[][] | null {
    const { arr: supportedCurrecyArr, map } = this.convertSetToArr();
    const edges = this.logGraph;
    const n = supportedCurrecyArr.length;

    if (n < 3) return null;

    // Try each vertex as a source
    for (let source = 0; source < n; source++) {
      const dist = this.getDistanceFromSource(source, n);
      const parent = new Array(n).fill(-1);

      // Bellman-Ford relaxation
      for (let i = 0; i < n - 1; i++) {
        for (const edge of edges) {
          const u = map.get(edge.from)!;
          const v = map.get(edge.to)!;
          if (dist[u] !== Infinity && dist[u] + edge.weight < dist[v]) {
            dist[v] = dist[u] + edge.weight;
            parent[v] = u;
          }
        }
      }

      // Check for negative cycle
      for (const edge of edges) {
        const u = map.get(edge.from)!;
        const v = map.get(edge.to)!;
        if (dist[u] !== Infinity && dist[u] + edge.weight < dist[v]) {
          // Found a negative cycle, reconstruct it
          const visited = new Array(n).fill(false);
          let curr = v;

          // Find a vertex in the cycle
          for (let i = 0; i < n; i++) {
            curr = parent[curr];
            if (curr === -1) break;
          }

          if (curr !== -1) {
            const cycle: number[] = [];
            const start = curr;

            do {
              if (visited[curr]) break;
              visited[curr] = true;
              cycle.push(curr);
              curr = parent[curr];
            } while (curr !== start && curr !== -1);

            if (cycle.length > 2) {
              cycle.push(cycle[0]); // Close the cycle
              const arbitragePath = cycle.map((i) => supportedCurrecyArr[i]);
              return [arbitragePath];
            }
          }
        }
      }
    }

    return null;
  }

  private convertSetToArr(): {
    arr: string[];
    map: Map<string, number>;
  } {
    const supportedCurrecyArr: string[] = [];
    const currencyIdxMap = new Map<string, number>();
    let i = 0;
    for (const currency of this.supportedCurrencies.values()) {
      supportedCurrecyArr.push(currency);
      currencyIdxMap.set(currency, i);
      i++;
    }
    return { arr: supportedCurrecyArr, map: currencyIdxMap };
  }

  private getDistanceFromSource(sourceIdx: number, n: number): number[] {
    const arr = new Array(n).fill(Infinity);
    arr[sourceIdx] = 0;
    return arr;
  }

  private buildLogGraph(exchangeRates: ExchangeRate[]) {
    const edges: Edge[] = [];
    for (const { from, to, rate } of exchangeRates) {
      if (rate <= 0) continue;
      const newEdge: Edge = {
        from,
        to,
        weight: -Math.log(rate),
      };

      const newReveseEdge: Edge = {
        from: to,
        to: from,
        weight: -Math.log(1 / rate),
      };
      edges.push(newEdge, newReveseEdge);
    }

    this.logGraph = edges;
  }

  private processExchangeRates(
    exchangeRates: ExchangeRate[]
  ): ProcessedExchangeRates {
    const rates = new Map<string, ExchangeFactor>();

    for (let { from, to, rate } of exchangeRates) {
      from = from.toUpperCase();
      to = to.toUpperCase();

      if (rate <= 0) continue;

      if (!rates.has(from)) rates.set(from, new Map());
      if (!rates.has(to)) rates.set(to, new Map());

      rates.get(from)!.set(to, rate);
      rates.get(to)!.set(from, parseFloat((1 / rate).toFixed(6)));

      this.supportedCurrencies.add(from);
      this.supportedCurrencies.add(to);
    }

    return rates;
  }

  private dfs(
    from: string,
    to: string,
    amount: number,
    visited: Set<string>
  ): number | null {
    if (from === to) return amount;
    if (visited.has(from)) return null;

    if (
      this.processedExchangeRates.has(from) &&
      this.processedExchangeRates.get(from)!.has(to)
    ) {
      const factor = this.processedExchangeRates.get(from)!.get(to)!;
      return amount * factor;
    }

    visited.add(from);

    const neighbors = this.processedExchangeRates.get(from);
    if (!neighbors) return null;

    for (const [neighbor, rate] of neighbors) {
      const result = this.dfs(neighbor, to, amount * rate, visited);
      if (result !== null) {
        if (!this.processedExchangeRates.has(from))
          this.processedExchangeRates.set(from, new Map());
        this.processedExchangeRates.get(from)!.set(to, result / amount);
        return result;
      }
    }

    return null;
  }
}
