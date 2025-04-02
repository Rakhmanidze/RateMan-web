import { FilterHandler } from "./view/FilterHandler.js";
import { RateProviderDisplay } from "./view/RateProviderDisplay.js";
import { RateProviderFilterService } from "./service/RateProviderFilterService.js";
import { fetchAndProcessAllProviderRates } from "./service/RateProviderService.js";
import { FilterState } from "./model/FilterState.js";

const providerDisplay = new RateProviderDisplay("provider-display");
const providerFilterService = new RateProviderFilterService();
const filterState = new FilterState();
const filterHandler = new FilterHandler(
  providerFilterService,
  providerDisplay,
  filterState
);

fetchAndProcessAllProviderRates()
  .then((providers) => {
    providerFilterService.setProviders(providers);
    filterHandler.applyAllFilters();
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });

filterHandler.setupEventListeners();
