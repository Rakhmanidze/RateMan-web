import { RateProvider } from "../model/RateProvider.js";
import { PROVIDER_TYPE, FILTER_PROVIDER_TYPE } from "../model/constants.js";

export class RateProviderFilterService {
  constructor() {
    this.originalProviders = [];
  }

  setProviders(providers) {
    this.originalProviders = providers;
  }

  filterProviders({ providerType = "all", searchTerm = "", currency = "" }) {
    if (!this.originalProviders?.length) {
      return [];
    }

    let filteredProviders = [...this.originalProviders];

    if (providerType !== FILTER_PROVIDER_TYPE.ALL) {
      filteredProviders = filteredProviders.filter((provider) => {
        const currentProviderType = provider.getType();
        if (providerType === FILTER_PROVIDER_TYPE.BANKS) {
          return currentProviderType === PROVIDER_TYPE.BANK;
        } else if (providerType === FILTER_PROVIDER_TYPE.EXCHANGES) {
          return currentProviderType === PROVIDER_TYPE.EXCHANGE;
        } else if (providerType === FILTER_PROVIDER_TYPE.CRYPTO_EXCHANGES) {
          return currentProviderType === PROVIDER_TYPE.CRYPTO_EXCHANGE;
        }
      });
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredProviders = filteredProviders.filter((provider) =>
        provider.getName().toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (currency && currency !== "All currencies" && currency !== "") {
      filteredProviders = filteredProviders
        .map((provider) => {
          const existingRate = provider
            .getAllRates()
            .find((rate) => rate.getForeignCurrency().getCode() === currency);
          if (!existingRate) return null;
          return new RateProvider(
            provider.getName(),
            provider.getBaseCurrency(),
            [existingRate],
            provider.getRatesDate(),
            provider.getPhoneNumber(),
            provider.getType()
          );
        })
        .filter((provider) => provider !== null);
    }

    return filteredProviders;
  }
  catch(error) {
    console.error("Error in filterProviders:", error);
    return [];
  }
}
