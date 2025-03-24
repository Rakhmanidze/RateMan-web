export class RateProviderFilterService {
  constructor() {
    this.originalProviders = [];
  }

  setProviders(providers) {
    this.originalProviders = providers;
  }

  searchProvider(searchedProviderName) {
    try {
      if (!this.originalProviders || this.originalProviders.length === 0) {
        console.warn("No providers data available");
        return [];
      }

      if (!searchedProviderName) {
        return this.originalProviders;
      }

      return this.originalProviders.filter((provider) =>
        provider.getName().toLowerCase().includes(searchedProviderName)
      );
    } catch (error) {
      console.error("Error in searchProvider:", error);
      return [];
    }
  }

  filterProviders(searchTerm) {
    if (!searchTerm) {
      this.filteredProviders = this.originalProviders;
      return;
    }
  }
}
