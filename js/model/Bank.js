import { CurrencyCode } from "./CurrencyCode.js";
import { CurrencyRate } from "./CurrencyRate.js";

export class Bank {
  constructor(name, baseCurrency, rates) {
    if (typeof name !== "string") {
      throw new Error("Bank name must be a string");
    }
    if (!(baseCurrency instanceof CurrencyCode)) {
      throw new Error("baseCurrency must be an instance of CurrencyCode");
    }
    if (!Array.isArray(rates)) {
      throw new Error("rates must be an array");
    }
    if (!rates.every((rate) => rate instanceof CurrencyRate)) {
      throw new Error("All rates must be instances of CurrencyRate");
    }

    this.name = name;
    this.baseCurrency = baseCurrency;
    this.rates = rates;
  }

  getName() {
    return this.name;
  }

  getBaseCurrency() {
    return this.baseCurrency;
  }

  getRate(currencyCode) {
    if (!(currencyCode instanceof CurrencyCode)) {
      throw new Error("currencyCode must be an instance of CurrencyCode");
    }
    return this.rates.find(
      (rate) => rate.getForeignCurrency().getCode() === currencyCode.getCode()
    );
  }

  getAllRates() {
    return this.rates;
  }
}
