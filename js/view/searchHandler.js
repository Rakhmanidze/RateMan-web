export class SearchHandler {
  constructor(providerFilterService, providerDisplay) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyPairInput = document.getElementById("select-pair");
    this.providerFilterDropdown = document.getElementById("provider-filter");
    this.providerFilterService = providerFilterService;
    this.providerDisplay = providerDisplay;
    this.noResultsMessage = document.createElement("div");
    this.noResultsMessage.className = "no-results";
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.providerSearchInput.addEventListener("input", (event) => {
      this.handleProviderSearch(event.target.value);
    });

    this.currencyPairInput.addEventListener("input", (event) => {
      const currencyPair = event.target.value.toUpperCase();
      console.log("Selected currency pair:", currencyPair);
      // TODO: Implement currency pair filtering
    });

    this.providerFilterDropdown.addEventListener("change", (event) => {
      this.handleProviderTypeFilter(event.target.value);
    });
  }

  handleProviderSearch(searchedProviderName) {
    try {
      const searchTerm = searchedProviderName.toLowerCase();
      const filteredProviders =
        this.providerFilterService.searchProvider(searchTerm);
      this.updateDisplay(filteredProviders);
    } catch (error) {
      console.error("Error in provider search:", error);
      this.providerDisplay.clearProviders();
    }
  }

  handleProviderTypeFilter(selectedType) {
    try {
      let filteredProviders = this.providerFilterService.originalProviders;

      if (selectedType !== "all") {
        filteredProviders = filteredProviders.filter((provider) => {
          const providerType = provider.getType();

          if (selectedType == "banks") {
            return providerType == "bank";
          } else if (selectedType == "exchanges") {
            return providerType == "exchange";
          } else if (selectedType == "crypto-exchanges") {
            return providerType == "crypto-exchange";
          }
        });
      }

      this.updateDisplay(filteredProviders);
    } catch (error) {
      console.error("Error in provider type filter:", error);
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

  // setupEventListeners() {
  //   this.providerSearchInput.addEventListener("input", (event) => {
  //     try {
  //       const searchedProviderName = event.target.value.toLowerCase();
  //       const searchedProvider =
  //         this.providerFilterService.searchProvider(searchedProviderName);

  //       this.providerDisplay.clearProviders();
  //       if (!searchedProvider || searchedProvider.length === 0) {
  //         this.noResultsMessage.textContent = "No results found";
  //         this.providerDisplay.container.appendChild(this.noResultsMessage);
  //       } else {
  //         this.noResultsMessage.remove();
  //         searchedProvider.forEach((provider) =>
  //           this.providerDisplay.displayProvider(provider)
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error in provider search:", error);
  //       this.providerDisplay.clearProviders();
  //     }
  //   });

  //   this.currencyPairInput.addEventListener("input", (event) => {
  //     const currencyPair = event.target.value.toUpperCase();
  //     console.log("Selected currency pair:", currencyPair);
  //     // TODO: Implement currency pair filtering
  //   });
  // }
}

//TODO:  add variable to that class as type('bank', 'exchange', 'crypto'));
//git commit -m "Put api url in config file."
