import { SearchHandler } from "./view/SearchHandler.js";
import { RateProviderDisplay } from "./view/RateProviderDisplay.js";
import { RateProviderFilterService } from "./service/RateProviderFilterService.js";
import { fetchAndProcessAllProviderRates } from "./service/RateProviderService.js";

const providerDisplay = new RateProviderDisplay("provider-display");
const providerFilterService = new RateProviderFilterService();
const filterState = new FilterState();
const searchHandler = new SearchHandler(
  providerFilterService,
  providerDisplay,
  filterState
);

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
