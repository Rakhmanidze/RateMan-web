import { FilterHandler } from "RateMan-web/view/FilterHandler.js";
import { RateProviderDisplay } from "RateMan-web/view/RateProviderDisplay.js";
import { RateProviderFilterService } from "RateMan-web/service/RateProviderFilterService.js";
import { fetchAndProcessAllProviderRates } from "RateMan-web/service/RateProviderService.js";
import { FilterState } from "RateMan-web/model/FilterState.js";
import { LogoHandler } from "RateMan-web/view/LogoHandler.js";

/**
 * Main application entry point for exchange rate viewer
 * Initializes services and UI components, fetches initial data
 */
const providerDisplay = new RateProviderDisplay("provider-display");
const providerFilterService = new RateProviderFilterService();
const filterState = new FilterState();
const filterHandler = new FilterHandler(
  providerFilterService,
  providerDisplay,
  filterState
);

new LogoHandler(filterHandler);

// Fetch provider data and initialize application
fetchAndProcessAllProviderRates()
  .then((providers) => {
    providerFilterService.setProviders(providers);
    filterHandler.applyAllFilters();
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });
