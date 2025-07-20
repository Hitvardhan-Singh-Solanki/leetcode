import { CurrencyConversion, ExchangeRate } from './currencyConcersion';

describe('CurrencyConversion', () => {
  let converter: CurrencyConversion;

  beforeEach(() => {
    const rates: ExchangeRate[] = [
      { from: 'USD', to: 'EUR', rate: 0.85 },
      { from: 'EUR', to: 'GBP', rate: 0.87 },
      { from: 'GBP', to: 'JPY', rate: 155.0 },
    ];
    converter = new CurrencyConversion(rates);
  });

  describe('convert', () => {
    it('should handle direct conversion', () => {
      const result = converter.convert('USD', 'EUR', 100);
      expect(result).toBeCloseTo(85, 2);
    });

    it('should handle multi-hop conversion', () => {
      const result = converter.convert('USD', 'JPY', 100);
      expect(result).toBeCloseTo(11462.25, 2);
    });

    it('should handle case-insensitive currency codes', () => {
      const result = converter.convert('usd', 'eur', 100);
      expect(result).toBeCloseTo(85, 2);
    });

    it('should return null for unknown currencies', () => {
      const result = converter.convert('XXX', 'USD', 100);
      expect(result).toBeNull();
    });

    it('should return null when no conversion path exists', () => {
      const isolatedConverter = new CurrencyConversion([
        { from: 'USD', to: 'EUR', rate: 0.85 },
        { from: 'JPY', to: 'CNY', rate: 0.047 },
      ]);
      const result = isolatedConverter.convert('USD', 'JPY', 100);
      expect(result).toBeNull();
    });

    it('should handle zero amount conversion', () => {
      const result = converter.convert('USD', 'EUR', 0);
      expect(result).toBe(0);
    });

    it('should handle negative amount conversion', () => {
      const result = converter.convert('USD', 'EUR', -100);
      expect(result).toBeCloseTo(-85, 2);
    });

    it('should ignore negative rates', () => {
      const negativeRateConverter = new CurrencyConversion([
        { from: 'USD', to: 'EUR', rate: -0.85 },
      ]);
      const result = negativeRateConverter.convert('USD', 'EUR', 100);
      expect(result).toBeNull();
    });

    it('should ignore zero rates', () => {
      const zeroRateConverter = new CurrencyConversion([
        { from: 'USD', to: 'EUR', rate: 0 },
      ]);
      const result = zeroRateConverter.convert('USD', 'EUR', 100);
      expect(result).toBeNull();
    });

    it('should handle very large numbers', () => {
      const result = converter.convert('USD', 'EUR', 1e9);
      expect(result).toBeCloseTo(8.5e8, 2);
    });

    it('should handle very small numbers', () => {
      const result = converter.convert('USD', 'EUR', 0.0001);
      expect(result).toBeCloseTo(0.000085, 8);
    });
  });

  describe('detectArbitrage', () => {
    it('should detect simple arbitrage opportunities', () => {
      const arbitrageRates: ExchangeRate[] = [
        { from: 'USD', to: 'EUR', rate: 0.85 },
        { from: 'EUR', to: 'GBP', rate: 0.87 },
        { from: 'GBP', to: 'USD', rate: 1.5 },
      ];
      const arbitrageConverter = new CurrencyConversion(arbitrageRates);
      const result = arbitrageConverter.detectArbitrage();
      expect(result).not.toBeNull();
      expect(result![0].length).toBeGreaterThan(1);
    });

    it('should return null when no arbitrage exists', () => {
      const noArbitrageRates: ExchangeRate[] = [
        { from: 'USD', to: 'EUR', rate: 0.85 },
        { from: 'EUR', to: 'GBP', rate: 0.87 },
      ];
      const noArbitrageConverter = new CurrencyConversion(noArbitrageRates);
      const result = noArbitrageConverter.detectArbitrage();
      expect(result).toBeNull();
    });

    it('should handle empty exchange rates', () => {
      const emptyConverter = new CurrencyConversion([]);
      const result = emptyConverter.detectArbitrage();
      expect(result).toBeNull();
    });

    it('should detect complex arbitrage with four currencies', () => {
      const complexArbitrageRates: ExchangeRate[] = [
        { from: 'USD', to: 'EUR', rate: 0.85 },
        { from: 'EUR', to: 'GBP', rate: 0.87 },
        { from: 'GBP', to: 'JPY', rate: 155.0 },
        { from: 'JPY', to: 'USD', rate: 0.0092 }, // Creates arbitrage opportunity
      ];
      const complexConverter = new CurrencyConversion(complexArbitrageRates);
      const result = complexConverter.detectArbitrage();
      expect(result).not.toBeNull();
      expect(result![0].length).toBeGreaterThan(3);
    });

    it('should ignore self-loops in arbitrage detection', () => {
      const selfLoopRates: ExchangeRate[] = [
        { from: 'USD', to: 'USD', rate: 1.1 }, // Invalid self-loop
        { from: 'USD', to: 'EUR', rate: 0.85 },
      ];
      const selfLoopConverter = new CurrencyConversion(selfLoopRates);
      const result = selfLoopConverter.detectArbitrage();
      expect(result).toBeNull();
    });
  });
});
