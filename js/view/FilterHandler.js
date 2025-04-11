import { CurrencySelector } from "../view/CurrencySelector.js";
import { CurrencyCode } from "../model/CurrencyCode.js";
import { SORT_OPTIONS, FILTER_PROVIDER_TYPE } from "../model/constants.js";

/**
 * Manages filtering and sorting of providers based on various criteria
 */
export class FilterHandler {
  /**
   * @param {Object} providerFilterService - Service for filtering providers
   * @param {Object} providerDisplay - Service for displaying providers
   * @param {Object} filterState - State management for filters
   */
  constructor(providerFilterService, providerDisplay, filterState) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyInput = document.getElementById("select-currency");
    this.providerFilterDropdown = document.getElementById("provider-filter");
    this.bestRateDropdown = document.getElementById("best-rate");
    this.providerDisplay = providerDisplay;
    this.providerFilterService = providerFilterService;
    this.filterState = filterState;

    this.currencySelector = new CurrencySelector(
      document.getElementById("select-currency"),
      document.getElementById("currency-dropdown"),
      (selectedCode) => {
        this.filterState.setCurrency(selectedCode || "");
        this.applyAllFilters();
      }
    );

    this.noResultsMessage = document.createElement("div");
    this.noResultsMessage.className = "no-results";

    this.initializeFromState();
    this.setupEventListeners();
  }

  /**
   * Sets initial UI state from stored filter state
   */
  initializeFromState() {
    this.providerSearchInput.value = this.filterState.getSearchedProviderName();
    this.providerFilterDropdown.value = this.filterState.getProviderType();
    this.currencyInput.value = this.filterState.getCurrency() || "";
    this.applyAllFilters();
  }

  /**
   * Attaches event listeners to filter UI elements
   */
  setupEventListeners() {
    this.providerSearchInput.addEventListener("input", (event) => {
      this.filterState.setSearchedProviderName(event.target.value);
      this.applyAllFilters();
    });

    this.providerFilterDropdown.addEventListener("change", (event) => {
      this.filterState.setProviderType(event.target.value);
      this.applyAllFilters();
    });

    this.bestRateDropdown.addEventListener("change", (event) => {
      this.sortByBestRate(event.target.value);
    });
  }

  /**
   * Attaches event listeners to filter UI elements
   */
  applyAllFilters() {
    const filters = {
      providerType: this.filterState.getProviderType(),
      searchTerm: this.filterState.getSearchedProviderName(),
      currency: this.filterState.getCurrency(),
    };

    const filteredProviders =
      this.providerFilterService.filterProviders(filters);
    this.updateDisplay(filteredProviders);
  }

  /**
   * Sorts providers by rate type if currency is selected
   * @param {string} sortType - Type of sort to apply
   */
  sortByBestRate(sortType) {
    const currency = this.filterState.getCurrency();

    if (!currency) {
      return;
    }

    const filters = {
      providerType: this.filterState.getProviderType(),
      searchTerm: this.filterState.getSearchedProviderName(),
      currency: currency,
    };

    let filteredProviders = this.providerFilterService.filterProviders(filters);

    if (filteredProviders && filteredProviders.length >= 2) {
      if (sortType === SORT_OPTIONS.BEST_BUY) {
        this.sortByRate(filteredProviders, currency, "buy");
      } else if (sortType === SORT_OPTIONS.BEST_SELL) {
        this.sortByRate(filteredProviders, currency, "sell");
      }
      this.updateDisplay(filteredProviders);
    } else {
      this.updateDisplay(filteredProviders);
    }
  }

  /**
   * Sorts provider list by specified rate type
   * @param {Array} providers - List of providers to sort
   * @param {string} currency - Currency code to use for rate comparison
   * @param {string} buyOrSell - Rate type for sorting (buy/sell)
   */
  sortByRate(providers, currency, buyOrSell) {
    providers.sort((providerA, providerB) => {
      let rateA, rateB;
      if (buyOrSell === "buy") {
        rateA = this.getBuyRate(providerA, currency);
        rateB = this.getBuyRate(providerB, currency);
        return rateA - rateB;
      } else {
        rateA = this.getSellRate(providerA, currency);
        rateB = this.getSellRate(providerB, currency);
        return rateB - rateA;
      }
    });
  }

  /**
   * Gets buy rate for provider and currency
   * @param {Object} provider - Provider object
   * @param {string} currency - Currency code
   * @returns {number} Buy rate or 0 if not available
   */
  getBuyRate(provider, currency) {
    const currencyCode = new CurrencyCode(currency);
    const rate = provider.getRate(currencyCode);
    return rate ? rate.getBuyRate() : 0;
  }

  /**
   * Gets sell rate for provider and currency
   * @param {Object} provider - Provider object
   * @param {string} currency - Currency code
   * @returns {number} Sell rate or 0 if not available
   */
  getSellRate(provider, currency) {
    const currencyCode = new CurrencyCode(currency);
    const rate = provider.getRate(currencyCode);
    return rate ? rate.getSellRate() : 0;
  }

  /**
   * Updates UI with filtered provider list
   * @param {Array} providers - List of providers to display
   */
  updateDisplay(providers) {
    this.providerDisplay.clearProviders();

    const currency = this.filterState.getCurrency();
    const isCertainCurrency =
      currency && currency !== "All currencies" && currency !== null;
    const providerCount = providers ? providers.length : 0;
    const IsbestRateDropdown = isCertainCurrency && providerCount >= 2;

    if (IsbestRateDropdown) {
      this.bestRateDropdown.classList.remove("hidden");
    } else {
      this.bestRateDropdown.classList.add("hidden");
    }

    if (!providers || providers.length === 0) {
      this.noResultsMessage.textContent = "No results found";
      this.providerDisplay.container.appendChild(this.noResultsMessage);
    } else {
      this.noResultsMessage.remove();
      providers.forEach((provider) =>
        this.providerDisplay.displayProvider(provider)
      );
    }
  }

  /**
   * Updates UI with filtered provider list
   * @param {Array} providers - List of providers to display
   */
  reset() {
    this.filterState.setCurrency("All currencies");
    this.filterState.setSearchedProviderName("");
    this.filterState.setProviderType("all");
    this.providerSearchInput.value = "";
    this.providerFilterDropdown.value = FILTER_PROVIDER_TYPE.ALL;
    this.currencyInput.value = "";
    this.bestRateDropdown.value = SORT_OPTIONS.NO_SORT;
    this.applyAllFilters();
  }
}
