import * as fs from 'fs';

export type Ask = [number, number];

export type Data = {
  asks: Ask[];
};

export type PerExchangePrice = {
  price: number;
  size: number;
};

export type ExchangePriceReturn = {
  exchange?: string;
  price?: number;
  size?: number;
  error?: Error;
};

export class OrderBookResolver {
  exchangePrices = [
    {
      name: 'Binance',
      file: './binance.txt',
    },
  ];

  async loadFile(path: string): Promise<Data> {
    try {
      const data = fs.readFileSync(path, 'utf-8');
      return JSON.parse(data) as unknown as Data;
    } catch (e) {
      throw new Error(
        `Unable to read file: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  }

  async getBestExchangePrice(size: number): Promise<ExchangePriceReturn> {
    let bestPrice = Infinity;
    let bestSize = 0;
    let bestExchange = '';

    if (this.exchangePrices.length === 0)
      return {
        error: new Error(`No exchanges`),
      };

    for (let exchange of this.exchangePrices) {
      const name = exchange.name;
      let data: Data | null = null;
      try {
        data = await this.loadFile(exchange.file);
      } catch (err) {
        return {
          error: err instanceof Error ? err : new Error(String(err)),
        };
      }

      const { asks } = data;

      const { price: pricePerExchange, size: quantityPerExchange } =
        this.getPerExchangePrices(size, asks);

      if (pricePerExchange < bestPrice) {
        bestPrice = pricePerExchange;
        bestSize = quantityPerExchange;
        bestExchange = name;
      }
    }

    return {
      price: bestPrice,
      size: bestSize,
      exchange: bestExchange,
    };
  }

  private getPerExchangePrices(size: number, asks: Ask[]): PerExchangePrice {
    let price: number = 0;
    let quantity = 0;

    for (let ask of asks) {
      let [units, pricePerUnit] = ask;
      quantity += units;
      if (quantity >= size) {
        quantity -= quantity - size;
        price += quantity * pricePerUnit;
        break;
      }

      // there could be a bug
      price += units * pricePerUnit;
    }

    return {
      price,
      size: quantity,
    };
  }
}
