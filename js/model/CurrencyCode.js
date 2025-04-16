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
    "SAR",
    "AED",
    "CZK",
    "DKK",
    "NOK",
    "SEK",
    "PLN",
    "HUF",
    "RON",
    "BGN",
    "HRK",
    "RSD",
    "ALL",
    "MDL",
    "UAH",
    "ISK",
    "MKD",
    "BYN",
    "AZN",
    "AMD",
    "GEL",
    "KZT",
    "TJS",
    "TMT",
    "UZS",
    "KGS",
    "THB",
    "MYR",
    "IDR",
    "PHP",
    "PKR",
    "BDT",
    "LKR",
    "MMK",
    "KHR",
    "LAK",
    "MNT",
    "NPR",
    "BTN",
    "AFN",
    "VND",
    "KPW",
    "MOP",
    "TWD",
    "ILS",
    "JOD",
    "LBP",
    "KWD",
    "BHD",
    "OMR",
    "QAR",
    "IRR",
    "IQD",
    "YER",
    "SYP",
    "EGP",
    "MAD",
    "TND",
    "DZD",
    "LYD",
    "SDG",
    "ETB",
    "KES",
    "UGX",
    "TZS",
    "NGN",
    "GHS",
    "XOF",
    "XAF",
    "BWP",
    "NAD",
    "SZL",
    "LSL",
    "MUR",
    "SCR",
    "MGA",
    "ZMW",
    "AOA",
    "CDF",
    "DJF",
    "ERN",
    "GMD",
    "GNF",
    "LRD",
    "MZN",
    "RWF",
    "SLL",
    "SOS",
    "SSP",
    "STN",
    "ARS",
    "CLP",
    "COP",
    "PEN",
    "UYU",
    "PYG",
    "BOB",
    "VES",
    "CRC",
    "HNL",
    "NIO",
    "DOP",
    "JMD",
    "TTD",
    "BBD",
    "GYD",
    "SRD",
    "BZD",
    "HTG",
    "CUP",
    "XCD",
    "ANG",
    "AWG",
    "KYD",
    "BSD",
    "BMD",
    "FKP",
    "GIP",
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
