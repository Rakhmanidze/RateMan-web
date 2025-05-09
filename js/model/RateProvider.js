import { CurrencyCode } from "./CurrencyCode.js";
import { CurrencyRate } from "./CurrencyRate.js";
import { PROVIDER_TYPE } from "./constants.js";

const VALID_TYPES = Object.values(PROVIDER_TYPE);

/** Represents a currency rate provider with validation */
export class RateProvider {
  /**
   * @param {string} name - Provider name
   * @param {CurrencyCode} baseCurrency - Base currency
   * @param {CurrencyRate[]} rates - Array of currency rates
   * @param {string} ratesDate - Date of rates
   * @param {string} phoneNumber - Contact number
   * @param {string} type - Provider type (from PROVIDER_TYPE)
   */
  constructor(name, baseCurrency, rates, ratesDate, phoneNumber, type) {
    if (typeof name !== "string") {
      throw new Error("RateProvider name must be a string");
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
    if (typeof ratesDate !== "string") {
      throw new Error("ratesDate must be a string");
    }
    if (!VALID_TYPES.includes(type)) {
      throw new Error("Invalid provider type");
    }
    this.name = name;
    this.baseCurrency = baseCurrency;
    this.rates = rates;
    this.ratesDate = ratesDate;
    this.phoneNumber = phoneNumber;
    this.type = type;
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

  getRatesDate() {
    return this.ratesDate;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getType() {
    return this.type;
  }
}
