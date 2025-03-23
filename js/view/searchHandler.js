import { BankFilterService } from "../service/bankFilterService.js";

export class SearchHandler {
  constructor(bankFilterService, bankDisplay) {
    this.bankSearchInput = document.getElementById("bank-search");
    this.currencyPairInput = document.getElementById("select-pair");
    this.bankFilterService = bankFilterService;
    this.bankDisplay = bankDisplay;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Bank search listener
    this.bankSearchInput.addEventListener("input", (event) => {
      try {
        const searchedBankName = event.target.value.toLowerCase();
        console.log("Searching for bank:", searchedBankName);
        const searchedBank =
          this.bankFilterService.searchBank(searchedBankName);

        if (!searchedBank || searchedBank.length === 0) {
          console.log("No banks found matching search criteria");
        }

        this.bankDisplay.clearBanks();
        searchedBank.forEach((bank) => this.bankDisplay.displayBank(bank));
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
