import { RateProviderFilterService } from "../service/RateProviderFilterService.js";
import { RateProviderDisplay } from "../view/rateProviderDisplay.js";

export class SearchHandler {
  constructor(providerFilterService, providerDisplay) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyPairInput = document.getElementById("select-pair");
    this.providerFilterService = providerFilterService;
    this.providerDisplay = providerDisplay;
    this.noResultsMessage = document.createElement("div");
    this.noResultsMessage.className = "no-results";
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.providerSearchInput.addEventListener("input", (event) => {
      try {
        const searchedProviderName = event.target.value.toLowerCase();
        console.log("Searching for provider:", searchedProviderName);
        const searchedProvider =
          this.providerFilterService.searchProvider(searchedProviderName);

        this.providerDisplay.clearProviders();
        if (!searchedProvider || searchedProvider.length === 0) {
          this.noResultsMessage.textContent = "No results found";
          this.providerDisplay.container.appendChild(this.noResultsMessage);
        } else {
          this.noResultsMessage.remove();
          searchedProvider.forEach((provider) =>
            this.providerDisplay.displayProvider(provider)
          );
        }
      } catch (error) {
        console.error("Error in provider search:", error);
        this.providerDisplay.clearProviders();
      }
    });

    // Currency pair listener
    this.currencyPairInput.addEventListener("input", (event) => {
      const currencyPair = event.target.value.toUpperCase();
      console.log("Selected currency pair:", currencyPair);
      // TODO: Implement currency pair filtering
    });
  }
}

//git commit -m "Remove from rate providers two not needed banks. Display phone number of rate provider. Add phone number to Trinity Bank."
//TODO:  add variable to that class as type('bank', 'exchange', 'crypto'));

//TODO: remove Poštovní spořitelna from the list of banks cause its CSOB.

//  ask ai if whole project's code is fine and doesnt have any issues.
//  if not, ask in order one by one from the worst and how to fix them and  why. git push

// [
//   {"name": "AKCENTA CZ", "phone": "+420 498 777 770"},
//   {"name": "Směnárna Nekázanka Exchange", "phone": "+420 773 152 658"},
//   {"name": "Eurowex", "phone": "+420 725 800 800"},
//   {"name": "RoklenFX", "phone": "+420 236 071 600"},
//   {"name": "Komerční banka", "phone": "+420 955 559 550"},
//   {"name": "Směnárna PETRA FINANCE", "phone": "+420 602 453 201"},
//   {"name": "MONETA Money Bank", "phone": "+420 224 443 636"},
//   {"name": "Fio banka", "phone": "+420 224 346 800"},
//   {"name": "Raiffeisenbank", "phone": "+420 412 440 000"},
//   {"name": "ČSOB", "phone": "+420 495 300 300"},
//   {"name": "UniCredit Bank", "phone": "+420 221 210 031"},
//   {"name": "mBank", "phone": "+420 222 111 999"},
//   {"name": "Oberbank AG", "phone": "+420 387 717 153"},
//   {"name": "Česká národní banka", "phone": "+420 224 411 111"},
//   {"name": "Air Bank", "phone": "+420 515 202 202"},
//   {"name": "Max banka", "phone": "+420 233 233 233"},
//   {"name": "Česká spořitelna", "phone": "+420 277 207 207"}
// ]
