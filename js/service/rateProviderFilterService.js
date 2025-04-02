export class RateProviderFilterService {
  constructor() {
    this.originalProviders = [];
  }

  setProviders(providers) {
    this.originalProviders = providers;
  }

  filterProviders({
    providerType = "all",
    searchTerm = "",
    currencyPair = "",
  }) {
    try {
      if (!this.originalProviders || this.originalProviders.length === 0) {
        return [];
      }

      let filteredProviders = [...this.originalProviders];

      if (providerType !== "all") {
        filteredProviders = filteredProviders.filter((provider) => {
          const currentProviderType = provider.getType();
          if (providerType === "banks") {
            return currentProviderType === "bank";
          } else if (providerType === "exchanges") {
            return currentProviderType === "exchange";
          } else if (providerType === "crypto-exchanges") {
            return currentProviderType === "crypto-exchange";
          }
        });
      }

      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredProviders = filteredProviders.filter((provider) =>
          provider.getName().toLowerCase().includes(lowerSearchTerm)
        );
      }

      if (currencyPair) {
        // TODO: Implement currency pair filtering logic here
      }

      return filteredProviders;
    } catch (error) {
      console.error("Error in filterProviders:", error);
      return [];
    }
  }
}
