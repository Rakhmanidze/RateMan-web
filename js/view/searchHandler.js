export class SearchHandler {
  constructor(providerFilterService, providerDisplay, filterState) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyPairInput = document.getElementById("select-pair");
    this.providerFilterDropdown = document.getElementById("provider-filter");
    // this.sortButton = document.querySelector("sort-btn");
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
    // this.sortButton.dataset.sort = this.filterState.getSortBy();

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
      // TODO: Implement currency pair filtering
    });

    this.providerFilterDropdown.addEventListener("change", (event) => {
      this.filterState.setProviderType(event.target.value);
      this.applyAllFilters();
    });

    // this.sortButton.addEventListener("click", (event) => {
    //   this.filterState.setSortBy(event.target.value);
    //   this.applyAllFilters(); // TODO:
    // });
  }

  applyAllFilters() {
    try {
      let filteredProviders = this.providerFilterService.originalProviders;

      const providerType = this.filterState.getProviderType();
      if (providerType !== "all") {
        filteredProviders = filteredProviders.filter((provider) => {
          const currentProviderType = provider.getType();
          switch (providerType) {
            case "banks":
              return currentProviderType === "bank";
            case "exchanges":
              return currentProviderType === "exchange";
            case "crypto-exchanges":
              return currentProviderType === "crypto-exchange";
            default:
              return true;
          }
        });
      }

      const searchTerm = this.filterState
        .getSearchedProviderName()
        .toLowerCase();
      if (searchTerm) {
        filteredProviders = filteredProviders.filter((provider) =>
          provider.getName().toLowerCase().includes(searchTerm)
        );
      }

      this.updateDisplay(filteredProviders);
    } catch (error) {
      console.error("Error applying filters:", error);
      this.providerDisplay.clearProviders();
    }
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
