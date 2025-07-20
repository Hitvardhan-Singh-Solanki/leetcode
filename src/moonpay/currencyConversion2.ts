export type ExchangeRate = {
  from: string;
  to: string;
  rate: number;
};

export class CurrencyConversion2 {
  currencies: string[] = [];
  currenciesSet = new Set<string>();
  currencyIdx = new Map<string, number>();
  currencyMatrix: number[][];
  unsupportedCurrencyError = new Error(`un-supported currency`);
  amountToConvert = 1;
  constructor(exchangeRates: ExchangeRate[]) {
    this.setDistinctCurrencies(exchangeRates);
    this.currencyMatrix = this.computeCurrecyMatrix(exchangeRates);
  }

  convert(from: string, to: string, amount: number): number | null {
    this.amountToConvert = amount;

    const result = this.dfs(from, to, amount);

    console.log(this.currencyMatrix);
    return result;
  }

  private dfs(
    from: string,
    to: string,
    amount: number,
    visited = new Set<string>()
  ): number | null {
    if (!this.currenciesSet.has(from) || !this.currenciesSet.has(to)) {
      throw this.unsupportedCurrencyError;
    }

    if (visited.has(from)) return null;

    visited.add(from);
    const fromIdx = this.currencyIdx.get(from)!;
    const toIdx = this.currencyIdx.get(to)!;
    const neighbors = this.currencyMatrix[fromIdx];
    const n = neighbors.length;
    for (let i = 0; i < n; i++) {
      const neighbor = neighbors[i];
      if (typeof neighbor !== 'number' || neighbor <= 0) continue;
      if (i === toIdx) return amount * neighbor;
      const newFrom = this.currencies[i];
      const result = this.dfs(newFrom, to, amount * neighbor, visited);
      if (result !== null) {
        const toIdx = this.currencyIdx.get(to)!;
        this.currencyMatrix[fromIdx][toIdx] = Number(
          parseFloat(`` + result / amount).toFixed(2)
        );
      }
    }
    return null;
  }

  private setDistinctCurrencies(rates: ExchangeRate[]) {
    for (const { from, to } of rates) {
      this.currenciesSet.add(from);
      this.currenciesSet.add(to);
    }

    for (const curr of this.currenciesSet.values()) {
      const newIndex = this.currencies.push(curr) - 1;
      this.currencyIdx.set(curr, newIndex);
    }
  }

  private computeCurrecyMatrix(rates: ExchangeRate[]): number[][] {
    const n = this.currencies.length;
    const matrix = new Array<number[]>(n)
      .fill([])
      .map(() => new Array<number>(n));

    // each currency to itself is 1 - 1 conversion
    for (let i = 0; i < n; i++) {
      matrix[i][i] = 1;
    }

    for (const { from, to, rate } of rates) {
      const fromIndex = this.currencyIdx.get(from)!;
      const toIndex = this.currencyIdx.get(to)!;
      matrix[fromIndex][toIndex] = rate;
      matrix[toIndex][fromIndex] = Number((1 / rate).toFixed(2));
    }
    return matrix;
  }
}
