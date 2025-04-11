import { CurrencySelector } from "./CurrencySelector.js";
import { CurrencyCode } from "../model/CurrencyCode.js";
import { SORT_OPTIONS, FILTER_PROVIDER_TYPE } from "../model/constants.js";

export class FilterHandler {
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

  initializeFromState() {
    this.providerSearchInput.value = this.filterState.getSearchedProviderName();
    this.providerFilterDropdown.value = this.filterState.getProviderType();
    this.currencyInput.value = this.filterState.getCurrency() || "";
    this.applyAllFilters();
  }

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

  getBuyRate(provider, currency) {
    const currencyCode = new CurrencyCode(currency);
    const rate = provider.getRate(currencyCode);
    return rate ? rate.getBuyRate() : 0;
  }

  getSellRate(provider, currency) {
    const currencyCode = new CurrencyCode(currency);
    const rate = provider.getRate(currencyCode);
    return rate ? rate.getSellRate() : 0;
  }

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
