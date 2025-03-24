import { SearchHandler } from "./view/SearchHandler.js";
import { RateProviderFilterService } from "./service/rateProviderFilterService.js";
import { RateProviderDisplay } from "./view/rateProviderDisplay.js";
import { fetchAndProcessAllProviderRates } from "./service/RateProviderService.js";

const providerDisplay = new RateProviderDisplay("provider-display");
const providerFilterService = new RateProviderFilterService();
const searchHandler = new SearchHandler(providerFilterService, providerDisplay);

function displayProvidersData(providers) {
  if (providers.length > 0) {
    for (let provider of providers) {
      providerDisplay.displayProvider(provider);
    }
  }
}

fetchAndProcessAllProviderRates()
  .then((providers) => {
    console.log(`Successfully processed ${providers.length} providers`);
    providerFilterService.setProviders(providers);
    displayProvidersData(providers);
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });

searchHandler.setupEventListeners();
