import { AddOrderInput, Order, OrderBook } from './oderbook';

describe('OrderBook', () => {
  let orderBook: OrderBook;

  beforeEach(() => {
    orderBook = new OrderBook();
  });

  it('should add a buy order to the book', () => {
    orderBook.addOrder({ type: 'buy', price: 100, quantity: 10 });

    const depth = orderBook.marketDepth();
    expect(depth.buy.get(100)).toBe(10);
    expect(depth.sell.size).toBe(0);
  });

  it('should add a sell order to the book', () => {
    orderBook.addOrder({ type: 'sell', price: 120, quantity: 5 });

    const depth = orderBook.marketDepth();
    expect(depth.sell.get(120)).toBe(5);
    expect(depth.buy.size).toBe(0);
  });

  it('should match a buy and sell order when buy price >= sell price', () => {
    const buyOrder = { type: 'buy', price: 100, quantity: 5 } as AddOrderInput;
    const sellOrder = { type: 'sell', price: 90, quantity: 5 } as AddOrderInput;

    orderBook.addOrder(buyOrder);
    orderBook.addOrder(sellOrder);

    const matches = orderBook.getMatched();
    expect(matches.length).toBe(1);

    const match = matches[0];
    expect(match.price).toBe(90);
    expect(match.quantity).toBe(5);
  });

  it('should handle partial match when buy quantity > sell quantity', () => {
    orderBook.addOrder({ type: 'buy', price: 100, quantity: 10 });
    orderBook.addOrder({ type: 'sell', price: 95, quantity: 4 });

    const matches = orderBook.getMatched();
    expect(matches.length).toBe(1);

    const match = matches[0];
    expect(match.price).toBe(95);
    expect(match.quantity).toBe(4);

    const marketDepth = orderBook.marketDepth();
    expect(marketDepth.buy.get(100)).toBe(6); // 10 - 4 = 6 left
    expect(marketDepth.sell.size).toBe(0);
  });

  it('should handle multiple matches with a single buy order', () => {
    // Sell orders: 3 @ 90, 4 @ 95
    orderBook.addOrder({ type: 'sell', price: 90, quantity: 3 });
    orderBook.addOrder({ type: 'sell', price: 95, quantity: 4 });

    // Buy order: 6 @ 100
    orderBook.addOrder({ type: 'buy', price: 100, quantity: 6 });

    const matches = orderBook.getMatched();
    expect(matches.length).toBe(2);
    expect(matches[0].quantity).toBe(3);
    expect(matches[0].price).toBe(90);
    expect(matches[1].quantity).toBe(3); // Remaining quantity matched from second sell order

    const marketDepth = orderBook.marketDepth();
    expect(marketDepth.sell.get(95)).toBe(1); // 4 - 3 = 1 left on second sell
    expect(marketDepth.buy.size).toBe(0); // Buy fully matched
  });

  it('should not match cancelled orders', () => {
    const ob = new OrderBook();

    const sellOrderId = ob.addOrder({ type: 'sell', price: 100, quantity: 5 });

    ob.cancelOrder(sellOrderId!);

    ob.addOrder({ type: 'buy', price: 100, quantity: 5 });

    const matches = ob.getMatched();

    expect(matches.length).toBe(0);
  });
});

describe('OrderBook edge cases', () => {
  let ob: OrderBook;

  beforeEach(() => {
    ob = new OrderBook();
  });

  test('should cancel an order after partial matching', () => {
    // Add buy order for 10 units at 100
    ob.addOrder({ type: 'buy', price: 100, quantity: 10 });
    // Add sell order for 6 units at 90 (partial match)
    ob.addOrder({ type: 'sell', price: 90, quantity: 6 });

    // There should be one match for 6 units
    expect(ob.getMatched().length).toBe(1);

    // Get remaining buy order (quantity should be 4)
    const buyOrder = ob.buyOrders.getQ()[0];
    expect(buyOrder.quantity).toBe(4);

    // Cancel remaining buy order
    ob.cancelOrder(buyOrder.id);

    // Add another sell order at price 90 and quantity 4
    ob.addOrder({ type: 'sell', price: 90, quantity: 4 });

    // No new matches should happen because buy order is cancelled
    expect(ob.getMatched().length).toBe(1);
  });

  test('should prioritize FIFO for same price orders', () => {
    // Add two buy orders at price 100 with different timestamps
    const order1 = new Order('buy', 5, 100, 'active');
    order1.createdAt = new Date(Date.now() - 1000); // older
    ob.buyOrders.enqueue(order1);
    ob.idToOrderMap.set(order1.id, order1);

    const order2 = new Order('buy', 5, 100, 'active');
    order2.createdAt = new Date(); // newer
    ob.buyOrders.enqueue(order2);
    ob.idToOrderMap.set(order2.id, order2);

    // Add sell order for 5 units at 90
    ob.addOrder({ type: 'sell', price: 90, quantity: 5 });

    // The match should be with order1 (older buy order)
    const match = ob.getMatched()[0];
    expect(match.buyOrderId).toBe(order1.id);

    // The newer buy order should still be active
    const remainingBuy = ob.buyOrders.getQ();
    expect(remainingBuy.length).toBe(1);
    expect(remainingBuy[0].id).toBe(order2.id);
  });

  test('should reject orders with zero quantity or price', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    ob.addOrder({ type: 'buy', price: 0, quantity: 10 });
    ob.addOrder({ type: 'sell', price: 100, quantity: 0 });

    expect(ob.buyOrders.getQ().length).toBe(0);
    expect(ob.sellOrders.getQ().length).toBe(0);
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  test('should handle cancellation of non-existent order gracefully', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    ob.cancelOrder('xxxxx');

    expect(spy).toHaveBeenCalledWith('Order ID xxxxx not found.');

    spy.mockRestore();
  });

  test('should chain multiple matches progressively', () => {
    // Add multiple sell orders at increasing prices
    ob.addOrder({ type: 'sell', price: 90, quantity: 2 });
    ob.addOrder({ type: 'sell', price: 95, quantity: 3 });
    ob.addOrder({ type: 'sell', price: 100, quantity: 5 });

    // Add a buy order that can match all three progressively
    ob.addOrder({ type: 'buy', price: 100, quantity: 10 });

    // Should have three matches
    expect(ob.getMatched().length).toBe(3);

    // Check total matched quantity is 10 (2+3+5)
    const totalMatched = ob
      .getMatched()
      .reduce((acc, m) => acc + m.quantity, 0);
    expect(totalMatched).toBe(10);

    // No remaining buy or sell orders
    expect(ob.buyOrders.getQ().length).toBe(0);
    expect(ob.sellOrders.getQ().length).toBe(0);
  });

  test('should allow adding orders after cancelling all', () => {
    // Add some orders
    ob.addOrder({ type: 'buy', price: 100, quantity: 2 });
    ob.addOrder({ type: 'sell', price: 95, quantity: 3 });

    // Cancel all orders
    for (const order of [...ob.buyOrders.getQ(), ...ob.sellOrders.getQ()]) {
      ob.cancelOrder(order.id);
    }

    // Queues should still hold orders (but all cancelled)
    expect(ob.buyOrders.getQ().every((o) => o.status === 'cancelled')).toBe(
      true
    );
    expect(ob.sellOrders.getQ().every((o) => o.status === 'cancelled')).toBe(
      true
    );

    // Add a new buy order and sell order that should match
    ob.addOrder({ type: 'buy', price: 100, quantity: 5 });
    ob.addOrder({ type: 'sell', price: 95, quantity: 5 });

    // There should be one match for 5 units
    expect(ob.getMatched().some((m) => m.quantity === 5)).toBe(true);
  });

  test('should handle very large quantity and price values', () => {
    const bigQuantity = 1e9;
    const bigPrice = 1e9;

    ob.addOrder({ type: 'buy', price: bigPrice, quantity: bigQuantity });
    ob.addOrder({ type: 'sell', price: bigPrice, quantity: bigQuantity });

    const matches = ob.getMatched();
    expect(matches.length).toBe(1);
    expect(matches[0].quantity).toBe(bigQuantity);
    expect(matches[0].price).toBe(bigPrice);
  });

  test('should handle rapid add and cancel without inconsistent state', () => {
    const addedOrderIds: string[] = [];

    // Add and cancel 100 orders rapidly
    for (let i = 0; i < 100; i++) {
      ob.addOrder({ type: 'buy', price: 100 + i, quantity: 1 });
      // Get last added order by scanning the idToOrderMap by price and quantity — or get from buyOrders queue.
      // Since addOrder assigns random IDs internally, get the newest order like this:
      const allBuyOrders = ob.buyOrders.getQ();
      const lastOrder = allBuyOrders.find(
        (o) => o.price === 100 + i && o.quantity === 1 && o.status === 'active'
      );
      if (lastOrder) {
        addedOrderIds.push(lastOrder.id);
        ob.cancelOrder(lastOrder.id);
      }
    }

    // Now verify all these orders are cancelled
    const allCancelled = addedOrderIds.every((id) => {
      const order = ob.idToOrderMap.get(id);
      return order?.status === 'cancelled';
    });

    expect(allCancelled).toBe(true);

    // Add a new sell order to check matching still works
    ob.addOrder({ type: 'sell', price: 50, quantity: 1 });

    // Add a new buy order to match with it
    ob.addOrder({ type: 'buy', price: 60, quantity: 1 });

    expect(ob.getMatched().some((m) => m.price === 50)).toBe(true);
  });
});

describe('OrderBook - getSnapshot()', () => {
  let orderBook: OrderBook;

  beforeEach(() => {
    orderBook = new OrderBook();

    // Buy orders
    orderBook.addOrder({ type: 'buy', price: 100, quantity: 5 });
    orderBook.addOrder({ type: 'buy', price: 101, quantity: 2 });
    orderBook.addOrder({ type: 'buy', price: 99, quantity: 3 });

    // Sell orders
    orderBook.addOrder({ type: 'sell', price: 103, quantity: 4 });
    orderBook.addOrder({ type: 'sell', price: 102, quantity: 6 });
    orderBook.addOrder({ type: 'sell', price: 104, quantity: 1 });
  });

  it('should return correct snapshot for depth = 2', () => {
    const snapshot = orderBook.getSnapshot(2);

    expect(snapshot.bids).toEqual([
      { price: 101, quantity: 2 },
      { price: 100, quantity: 5 },
    ]);

    expect(snapshot.asks).toEqual([
      { price: 102, quantity: 6 },
      { price: 103, quantity: 4 },
    ]);
  });

  it('should return all available levels if depth > order levels', () => {
    const snapshot = orderBook.getSnapshot(10);

    expect(snapshot.bids).toEqual([
      { price: 101, quantity: 2 },
      { price: 100, quantity: 5 },
      { price: 99, quantity: 3 },
    ]);

    expect(snapshot.asks).toEqual([
      { price: 102, quantity: 6 },
      { price: 103, quantity: 4 },
      { price: 104, quantity: 1 },
    ]);
  });

  it('should return empty arrays when there are no orders', () => {
    const emptyBook = new OrderBook();
    const snapshot = emptyBook.getSnapshot(5);
    expect(snapshot.bids).toEqual([]);
    expect(snapshot.asks).toEqual([]);
  });

  it('should reflect cancelled orders in snapshot', () => {
    const allOrders = Array.from(orderBook.idToOrderMap.entries());
    const buy100Id = allOrders.find(
      ([, o]) => o.type === 'buy' && o.price === 100
    )?.[0];

    orderBook.cancelOrder(buy100Id!);

    const snapshot = orderBook.getSnapshot(2);

    expect(snapshot.bids).toEqual([
      { price: 101, quantity: 2 },
      { price: 99, quantity: 3 },
    ]);
  });

  it('should return empty arrays when depth is 0', () => {
    const snapshot = orderBook.getSnapshot(0);
    expect(snapshot.bids).toEqual([]);
    expect(snapshot.asks).toEqual([]);
  });

  it('should handle negative depth gracefully (return empty)', () => {
    const snapshot = orderBook.getSnapshot(-5);
    expect(snapshot.bids).toEqual([]);
    expect(snapshot.asks).toEqual([]);
  });

  it('should return consistent results even after partial matches', () => {
    // Add matchable orders
    orderBook.addOrder({ type: 'sell', price: 100, quantity: 1 }); // matches buy 101
    orderBook.addOrder({ type: 'sell', price: 100, quantity: 1 }); // matches buy 101
    // 2 matched, 2 of buy@101 still remain

    const snapshot = orderBook.getSnapshot(2);

    expect(snapshot.bids).toEqual([
      { price: 101, quantity: 2 }, // remaining
      { price: 100, quantity: 5 },
    ]);
  });
});
