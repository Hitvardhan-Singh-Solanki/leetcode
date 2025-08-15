import { v4 as uuid } from 'uuid';
import { PriorityQueue } from './priorityQueue';

export type OrderType = 'buy' | 'sell';
export type OrderStatus = 'active' | 'cancelled';
export type AddOrderInput = {
  type: OrderType;
  price: number;
  quantity: number;
};
export type Match = {
  id: string;
  sellOrderId: string;
  buyOrderId: string;
  price: number;
  quantity: number;
  createdAt: Date;
};
export type MarketDepth = {
  buy: Map<number, number>;
  sell: Map<number, number>;
};
export type SnapshotLevel = { price: number; quantity: number };
export type Snapshot = {
  bids: SnapshotLevel[];
  asks: SnapshotLevel[];
};

export interface IOrder {
  id: string;
  type: OrderType;
  quantity: number;
  price: number;
  createdAt: Date;
  status: OrderStatus;
}

interface IOrderBook {
  addOrder(order: IOrder): void;
  getMatched(): Match[];
  marketDepth(): MarketDepth;
}

export class Order implements IOrder {
  id: string;
  createdAt: Date;

  constructor(
    public type: OrderType,
    public quantity: number,
    public price: number,
    public status: OrderStatus
  ) {
    this.id = uuid();
    this.createdAt = new Date();
  }
}

export class OrderBook implements IOrderBook {
  buyOrders: PriorityQueue<IOrder>;
  sellOrders: PriorityQueue<IOrder>;
  matches: Match[] = [];
  idToOrderMap = new Map<string, IOrder>();

  constructor() {
    this.buyOrders = new PriorityQueue('max', (a: IOrder, b: IOrder) => {
      if (a.price === b.price)
        return b.createdAt.getTime() - a.createdAt.getTime();
      else return b.price - a.price;
    });
    this.sellOrders = new PriorityQueue('min', (a: IOrder, b: IOrder) => {
      if (a.price === b.price)
        return a.createdAt.getTime() - b.createdAt.getTime();
      else return a.price - b.price;
    });
  }

  addOrder(input: AddOrderInput): string | null {
    /*
        Add the incoming order to the appropriate queue.
        Attempt to match it against opposing orders.
        Create a Match record for each successful trade
    */

    if (input.quantity <= 0 || input.price <= 0) {
      console.warn(
        `invalid quantity ${input.quantity} should be >= 0 or 
        invalid price ${input.price} should be >= 0`
      );
      return null;
    }

    if (input.type !== 'buy' && input.type !== 'sell') {
      console.warn(`invalid order type ${input.type}`);
      return null;
    }

    const order = new Order(input.type, input.quantity, input.price, 'active');

    input.type === 'buy'
      ? this.buyOrders.enqueue(order)
      : this.sellOrders.enqueue(order);

    this.idToOrderMap.set(order.id, order);
    this.matchOrder();

    return order.id;
  }

  getMatched(): Match[] {
    return this.matches;
  }

  cancelOrder(id: string): void {
    const order = this.idToOrderMap.get(id);
    if (!order) {
      return;
    }

    if (order.status === 'cancelled') {
      return;
    }

    order.status = 'cancelled';

    this.matchOrder();
  }

  marketDepth(): MarketDepth {
    const aggregatedBuyPriceToQuantityMap = new Map<number, number>();
    const aggregatedSellPriceToQuantityMap = new Map<number, number>();

    for (const order of this.buyOrders.getQ()) {
      if (order.status === 'cancelled') continue;
      const price = order.price;
      let aggregateOrder = aggregatedBuyPriceToQuantityMap.get(price) || 0;
      aggregateOrder += order.quantity;
      aggregatedBuyPriceToQuantityMap.set(price, aggregateOrder);
    }

    for (const order of this.sellOrders.getQ()) {
      if (order.status === 'cancelled') continue;
      const price = order.price;
      let aggregateOrder = aggregatedSellPriceToQuantityMap.get(price) || 0;
      aggregateOrder += order.quantity;
      aggregatedSellPriceToQuantityMap.set(price, aggregateOrder);
    }

    return {
      buy: aggregatedBuyPriceToQuantityMap,
      sell: aggregatedSellPriceToQuantityMap,
    };
  }

  getSnapshot(depth: number) {
    return {
      bids: this.buyOrders
        .getQ()
        .filter((o) => o.status === 'active' && o.quantity > 0)
        .sort((a, b) => b.price - a.price)
        .map(({ price, quantity }) => ({ price, quantity }))
        .slice(0, depth),
      asks: this.sellOrders
        .getQ()
        .filter((o) => o.status === 'active' && o.quantity > 0)
        .sort((a, b) => a.price - b.price)
        .map(({ price, quantity }) => ({ price, quantity }))
        .slice(0, depth),
    };
  }

  private matchOrder() {
    while (this.canMatch()) {
      const sellOrder = this.sellOrders.peek();
      const buyOrder = this.buyOrders.peek();

      if (!sellOrder || !buyOrder) break;

      // check status
      const sellOrderStatus = this.idToOrderMap.get(sellOrder.id)!.status;
      if (sellOrderStatus === 'cancelled') {
        this.sellOrders.dequeue();
        continue;
      }
      const buyOrderStatus = this.idToOrderMap.get(buyOrder.id)!.status;
      if (buyOrderStatus === 'cancelled') {
        this.buyOrders.dequeue();
        continue;
      }

      const quantity = Math.min(sellOrder.quantity, buyOrder.quantity);

      const match: Match = {
        id: uuid(),
        sellOrderId: sellOrder.id,
        buyOrderId: buyOrder.id,
        quantity,
        price: sellOrder.price,
        createdAt: new Date(),
      };

      this.matches.push(match);

      sellOrder.quantity = sellOrder.quantity - quantity;
      buyOrder.quantity = buyOrder.quantity - quantity;

      if (sellOrder.quantity <= 0) {
        const soldOrder = this.sellOrders.dequeue();
      }
      if (buyOrder.quantity <= 0) {
        const boughtOrder = this.buyOrders.dequeue();
      }
    }
  }

  private canMatch(): boolean {
    const sellOrder = this.sellOrders.peek();
    const buyOrder = this.buyOrders.peek();
    return !!sellOrder && !!buyOrder && sellOrder.price <= buyOrder.price;
  }
}
