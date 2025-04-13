/** Manages filter state with localStorage persistence using a single JSON object */
export class FilterState {
  /**
   * @property {Object} state Filter state object
   * @property {string} state.searchProviderName Provider search term (default "")
   * @property {string} state.currency Selected currency (default "")
   * @property {string} state.providerType Provider filter (default "all")
   * @property {string} state.sortBy Sorting method (default "noRateSorting")
   */
  constructor() {
    // Load saved state from localStorage or default to empty object
    const savedState = JSON.parse(localStorage.getItem("filterState")) || {};
    // Initialize state with defaults if no saved values exist
    this.state = {
      searchProviderName: savedState.searchProviderName || "",
      currency: savedState.currency || "",
      providerType: savedState.providerType || "all",
      sortBy: savedState.sortBy || "noRateSorting",
    };
  }

  /** Saves the entire state object to localStorage */
  saveState() {
    localStorage.setItem("filterState", JSON.stringify(this.state));
  }

  /**
   * Sets the provider search term
   * @param {string} name - The search term for filtering providers
   */
  setSearchedProviderName(name) {
    this.state.searchProviderName = name;
    this.saveState();
  }

  /**
   * Gets the provider search term
   * @returns {string} The current search term
   */
  getSearchedProviderName() {
    return this.state.searchProviderName;
  }

  /**
   * Sets the selected currency
   * @param {string} pair - The currency code (e.g., "USD") or empty string
   */
  setCurrency(pair) {
    this.state.currency = pair;
    this.saveState();
  }

  /**
   * Gets the selected currency
   * @returns {string} The current currency code or empty string
   */
  getCurrency() {
    return this.state.currency;
  }

  /**
   * Sets the provider type filter
   * @param {string} type - The provider type (e.g., "all", "banks", "exchanges")
   */
  setProviderType(type) {
    this.state.providerType = type;
    this.saveState();
  }

  /**
   * Gets the provider type filter
   * @returns {string} The current provider type
   */
  getProviderType() {
    return this.state.providerType;
  }

  /**
   * Sets the sorting method
   * @param {string} sort - The sorting option (e.g., "noRateSorting", "best-buy-rate")
   */
  setSortBy(sort) {
    this.state.sortBy = sort;
    this.saveState();
  }

  /**
   * Gets the sorting method
   * @returns {string} The current sorting option
   */
  getSortBy() {
    return this.state.sortBy;
  }

  /** Resets all filters to their default values */
  clearAllFilters() {
    this.state = {
      searchProviderName: "",
      currency: "",
      providerType: "all",
      sortBy: "noRateSorting",
    };
    this.saveState();
  }
}
