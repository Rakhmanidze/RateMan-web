export class SearchHandler {
  constructor() {
    this.bankSearchInput = document.getElementById("bank-search");
    this.currencyPairInput = document.getElementById("select-pair");

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Bank search listener
    this.bankSearchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      console.log("Searching for bank:", searchTerm);
      // TODO: Implement bank filtering
    });

    // Currency pair listener
    this.currencyPairInput.addEventListener("input", (event) => {
      const currencyPair = event.target.value.toUpperCase();
      console.log("Selected currency pair:", currencyPair);
      // TODO: Implement currency pair filtering
    });
  }
}
