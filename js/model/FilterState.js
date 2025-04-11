/** Manages filter state with localStorage persistence */
export class FilterState {
  /**
   * @property {string} searchProviderName Provider search term (default "")
   * @property {string} currency Selected currency (default "")
   * @property {string} providerType Provider filter (default "all")
   * @property {string} sortBy Sorting method (default "noRateSorting")
   */
  constructor() {
    this.searchProviderName = localStorage.getItem("searchProviderName") || "";
    this.currency = localStorage.getItem("currency") || "";
    this.providerType = localStorage.getItem("providerType") || "all";
    this.sortBy = localStorage.getItem("sortBy") || "noRateSorting";
  }

  setSearchedProviderName(name) {
    this.searchProviderName = name;
    localStorage.setItem("searchProviderName", name);
  }

  getSearchedProviderName() {
    return this.searchProviderName;
  }

  setCurrency(pair) {
    this.currency = pair;
    localStorage.setItem("currency", pair);
  }

  getCurrency() {
    return this.currency;
  }

  setProviderType(type) {
    this.providerType = type;
    localStorage.setItem("providerType", type);
  }

  getProviderType() {
    return this.providerType;
  }

  setSortBy(sort) {
    this.sortBy = sort;
    localStorage.setItem("sortBy", sort);
  }

  getSortBy() {
    return this.sortBy;
  }

  clearAllFilters() {
    this.setSearchedProviderName("");
    this.setCurrency("");
    this.setProviderType("all");
    this.setSortBy("noRateSorting");
  }
}
