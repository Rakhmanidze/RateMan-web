import { fetchAndProcessAllBankRates } from "./service/bankService.js";
import { BankDisplay } from "./view/BankDisplay.js";
import { SearchHandler } from "./view/SearchHandler.js";

// Create display component
const bankDisplay = new BankDisplay("bank-display");

// Initialize search handler
const searchHandler = new SearchHandler();

// Function to handle display logic
function displayBankData(banks) {
  if (banks.length > 0) {
    bankDisplay.clearBanks(); // Clear existing banks first
    for (let bank of banks) {
      bankDisplay.displayBank(bank);
    }
  }
}

// Execute the fetch
fetchAndProcessAllBankRates()
  .then((banks) => {
    console.log(`Successfully processed ${banks.length} banks`);
    displayBankData(banks);
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });
