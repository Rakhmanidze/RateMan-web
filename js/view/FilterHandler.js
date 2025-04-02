export class FilterHandler {
  constructor(providerFilterService, providerDisplay, filterState) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyPairInput = document.getElementById("select-pair");
    this.providerFilterDropdown = document.getElementById("provider-filter");
    this.providerFilterService = providerFilterService;
    this.providerDisplay = providerDisplay;
    this.filterState = filterState;
    this.noResultsMessage = document.createElement("div");
    this.noResultsMessage.className = "no-results";

    this.initializeFromState();
    this.setupEventListeners();
  }

  initializeFromState() {
    this.providerSearchInput.value = this.filterState.getSearchedProviderName();
    this.providerFilterDropdown.value = this.filterState.getProviderType();
    this.currencyPairInput.value = this.filterState.getCurrencyPair();
    this.applyAllFilters();
  }

  setupEventListeners() {
    this.providerSearchInput.addEventListener("input", (event) => {
      this.filterState.setSearchedProviderName(event.target.value);
      this.applyAllFilters();
    });

    this.currencyPairInput.addEventListener("input", (event) => {
      this.filterState.setCurrencyPair(event.target.value);
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
      currencyPair: this.filterState.getCurrencyPair(),
    };

    const filteredProviders =
      this.providerFilterService.filterProviders(filters);
    this.updateDisplay(filteredProviders);
  }

  updateDisplay(providers) {
    this.providerDisplay.clearProviders();

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
}
