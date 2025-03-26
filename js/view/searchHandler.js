export class SearchHandler {
  constructor(providerFilterService, providerDisplay) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyPairInput = document.getElementById("select-pair");
    this.providerFilterService = providerFilterService;
    this.providerDisplay = providerDisplay;
    this.noResultsMessage = document.createElement("div");
    this.noResultsMessage.className = "no-results";
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.providerSearchInput.addEventListener("input", (event) => {
      try {
        const searchedProviderName = event.target.value.toLowerCase();
        const searchedProvider =
          this.providerFilterService.searchProvider(searchedProviderName);

        this.providerDisplay.clearProviders();
        if (!searchedProvider || searchedProvider.length === 0) {
          this.noResultsMessage.textContent = "No results found";
          this.providerDisplay.container.appendChild(this.noResultsMessage);
        } else {
          this.noResultsMessage.remove();
          searchedProvider.forEach((provider) =>
            this.providerDisplay.displayProvider(provider)
          );
        }
      } catch (error) {
        console.error("Error in provider search:", error);
        this.providerDisplay.clearProviders();
      }
    });

    this.currencyPairInput.addEventListener("input", (event) => {
      const currencyPair = event.target.value.toUpperCase();
      console.log("Selected currency pair:", currencyPair);
      // TODO: Implement currency pair filtering
    });
  }
}

//TODO:  add variable to that class as type('bank', 'exchange', 'crypto'));
//git commit -m "Put api url in config file."
