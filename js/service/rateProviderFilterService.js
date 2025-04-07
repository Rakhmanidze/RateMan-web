import { RateProvider } from "../model/RateProvider.js";
import { CurrencyRate } from "../model/CurrencyRate.js";
import { CurrencyCode } from "../model/CurrencyCode.js";

export class RateProviderFilterService {
  constructor() {
    this.originalProviders = [];
  }

  setProviders(providers) {
    this.originalProviders = providers;
  }

  filterProviders({ providerType = "all", searchTerm = "", currency = "" }) {
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

      if (currency && currency !== "All currencies") {
        filteredProviders = filteredProviders.map((provider) => {
          const existingRate = provider
            .getAllRates()
            .find((rate) => rate.getForeignCurrency().getCode() === currency);

          const rates = existingRate
            ? [existingRate]
            : [new CurrencyRate(new CurrencyCode(currency), null, null)];

          return new RateProvider(
            provider.getName(),
            provider.getBaseCurrency(),
            rates,
            provider.getRatesDate(),
            provider.getPhoneNumber(),
            provider.getType()
          );
        });
      }

      return filteredProviders;
    } catch (error) {
      console.error("Error in filterProviders:", error);
      return [];
    }
  }
}
