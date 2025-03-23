import { BankFilterService } from "../service/bankFilterService.js";

export class SearchHandler {
  constructor(bankFilterService, bankDisplay) {
    this.bankSearchInput = document.getElementById("bank-search");
    this.currencyPairInput = document.getElementById("select-pair");
    this.bankFilterService = bankFilterService;
    this.bankDisplay = bankDisplay;
    this.noResultsMessage = document.createElement("div");
    this.noResultsMessage.className = "no-results";
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.bankSearchInput.addEventListener("input", (event) => {
      try {
        const searchedBankName = event.target.value.toLowerCase();
        console.log("Searching for bank:", searchedBankName);
        const searchedBank =
          this.bankFilterService.searchBank(searchedBankName);

        this.bankDisplay.clearBanks();
        if (!searchedBank || searchedBank.length === 0) {
          this.noResultsMessage.textContent = "No results found";
          this.bankDisplay.container.appendChild(this.noResultsMessage);
        } else {
          this.noResultsMessage.remove();
          searchedBank.forEach((bank) => this.bankDisplay.displayBank(bank));
        }
      } catch (error) {
        console.error("Error in bank search:", error);
        this.bankDisplay.clearBanks();
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

//git commit -m "Rename title of the page to RateMan. Add No results found for message for search."

//TODO: rename Bank class and all related files to RateProvider (try to add variable to that class as type('bank', 'exchange', 'crypto')); git push

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
