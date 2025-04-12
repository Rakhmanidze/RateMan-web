/**
 * Returns the path to the flag image for a given currency code.
 * @param {string} currencyCode - The currency code (e.g., "EUR").
 * @returns {string} The path to the flag image.
 */
export function getFlagPath(currencyCode) {
  return `sources/currencyImg/${currencyCode.toUpperCase()}.svg`;
}
