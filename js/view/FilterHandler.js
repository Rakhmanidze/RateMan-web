import { CurrencySelector } from "./CurrencySelector.js";

export class FilterHandler {
  constructor(providerFilterService, providerDisplay, filterState) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyInput = document.getElementById("select-currency");
    this.providerFilterDropdown = document.getElementById("provider-filter");
    this.bestRateDropdown = document.getElementById("best-rate");
    this.providerFilterService = providerFilterService;
    this.providerDisplay = providerDisplay;
    this.filterState = filterState;

    this.currencySelector = new CurrencySelector(
      document.getElementById("select-currency"),
      document.getElementById("currency-dropdown"),
      (selectedCode) => {
        this.filterState.setCurrency(selectedCode);
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
    this.currencyInput.value =
      this.filterState.getCurrency() === "All currencies"
        ? ""
        : this.filterState.getCurrency() || "";
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
    this.providerFilterDropdown.value = "all";
    this.currencyInput.value = "";
    this.applyAllFilters();
  }
}
