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
        console.warn("No providers data available");
        return [];
      }

      let filteredProviders = [...this.originalProviders];

      // Filter by provider type
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

      // Filter by search term
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredProviders = filteredProviders.filter((provider) =>
          provider.getName().toLowerCase().includes(lowerSearchTerm)
        );
      }

      // Filter by currency pair (placeholder for future implementation)
      if (currencyPair) {
        // TODO: Implement currency pair filtering logic here
        // For now, we'll leave it as a no-op
        console.log(
          `Filtering by currency pair: ${currencyPair} (not implemented)`
        );
      }

      return filteredProviders;
    } catch (error) {
      console.error("Error in filterProviders:", error);
      return [];
    }
  }
}
