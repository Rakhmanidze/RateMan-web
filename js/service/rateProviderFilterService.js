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

//TODO
//when choosing currency which doesnt have rates page goes a bit right
//when choosing currency scroll thing if i use it then input goes wild and i have all currencies in it
//when inputing currency its reacting immediately when i input something but should do nothing until i choose currency from list in dropdown menu
