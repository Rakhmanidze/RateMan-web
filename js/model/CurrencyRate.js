import { CurrencyCode } from "CurrencyCode.js";

/**
 * Represents currency exchange rates with buy/sell values
 */
export class CurrencyRate {
  /**
   * @param {CurrencyCode} foreignCurrency - The currency being exchanged
   * @param {number} buyRate - Exchange rate for buying (must be <= sellRate)
   * @param {number} sellRate - Exchange rate for selling
   * @throws {Error} If rates are invalid
   */
  constructor(foreignCurrency, buyRate, sellRate) {
    if (!(foreignCurrency instanceof CurrencyCode)) {
      throw new Error("foreignCurrency must be an instance of CurrencyCode");
    }
    if (typeof buyRate !== "number") {
      throw new Error("buyRate must be a number");
    }
    if (typeof sellRate !== "number") {
      throw new Error("sellRate must be a number");
    }
    if (buyRate <= 0 || sellRate <= 0) {
      throw new Error("Rates must be positive numbers");
    }
    if (sellRate < buyRate) {
      throw new Error("Sell rate cannot be lower than buy rate");
    }

    this.foreignCurrency = foreignCurrency;
    this.buyRate = buyRate;
    this.sellRate = sellRate;
  }

  getForeignCurrency() {
    return this.foreignCurrency;
  }

  getBuyRate() {
    return this.buyRate;
  }

  getSellRate() {
    return this.sellRate;
  }
}
