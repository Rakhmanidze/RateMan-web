import { CurrencyCode } from "../model/CurrencyCode.js";

export function createCurrencyCode(currency) {
  try {
    return new CurrencyCode(currency);
  } catch (error) {
    console.warn(`Skipping unsupported currency: ${currency}`);
    return null;
  }
}
