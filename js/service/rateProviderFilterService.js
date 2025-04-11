import { RateProvider } from "/RateMan-web/model/RateProvider.js";
import {
  PROVIDER_TYPE,
  FILTER_PROVIDER_TYPE,
} from "rateman/model/constants.js";

/** Filters rate providers by type, search term, and currency */
export class RateProviderFilterService {
  constructor() {
    this.originalProviders = [];
  }

  setProviders(providers) {
    this.originalProviders = providers;
  }

  /**
   * Filters providers based on criteria
   * @param {Object} filters
   * @param {string} filters.providerType
   * @param {string} filters.searchTerm
   * @param {string} filters.currency
   * @returns {RateProvider[]}
   */
  filterProviders({ providerType = "all", searchTerm = "", currency = "" }) {
    try {
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
    } catch (error) {
      console.error("Error in filterProviders:", error);
      return [];
    }
  }
}
