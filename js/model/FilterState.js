export class FilterState {
  constructor() {
    this.searchProviderName = localStorage.getItem("searchProviderName") || "";
    this.currencyPair = localStorage.getItem("currencyPair") || "";
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

  setCurrencyPair(pair) {
    this.currencyPair = pair;
    localStorage.setItem("currencyPair", pair);
  }

  getCurrencyPair() {
    return this.currencyPair;
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
    this.setCurrencyPair("");
    this.setProviderType("all");
    this.setSortBy("noRateSorting");
  }
}
