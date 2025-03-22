import { fetchAndProcessAllBankRates } from "./service/bankService.js";
import { BankDisplay } from "./view/BankDisplay.js";

const bankDisplay = new BankDisplay("bank-display");

function displayBankData(banks) {
  if (banks.length > 0) {
    bankDisplay.clearBanks(); // Clear existing banks first
    for (let bank of banks) {
      bankDisplay.displayBank(bank);
    }
  }
}

fetchAndProcessAllBankRates()
  .then((banks) => {
    console.log(`Successfully processed ${banks.length} banks`);
    displayBankData(banks);
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });
