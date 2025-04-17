/**
 * Represents a valid currency code with validation
 */
export class CurrencyCode {
  /**
   * Set of valid currency codes supported by the application
   * @type {Set<string>}
   */
  static VALID_CODES = new Set([
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "INR",
    "NZD",
    "SGD",
    "HKD",
    "KRW",
    "TRY",
    "RUB",
    "BRL",
    "ZAR",
    "MXN",
    "AED",
    "CZK",
    "DKK",
    "NOK",
    "SEK",
    "PLN",
    "HUF",
    "RON",
    "BGN",
    "UAH",
    "ISK",
    "THB",
    "MYR",
    "IDR",
    "PHP",
    "VND",
    "ILS",
    "TND",
    "XDR",
    "BAM",
  ]);

  constructor(code) {
    if (typeof code !== "string") {
      throw new Error("Currency code must be a string");
    }
    if (!CurrencyCode.VALID_CODES.has(code.toUpperCase())) {
      throw new Error(`Invalid currency code: ${code}`);
    }
    this.code = code.toUpperCase();
  }

  getCode() {
    return this.code;
  }

  equals(other) {
    if (!(other instanceof CurrencyCode)) {
      return false;
    }
    return this.code === other.code;
  }

  toString() {
    return this.code;
  }

  static create(currency) {
    return new CurrencyCode(currency);
  }
}
