import { fetchAndProcessAllBankRates } from "./service/bankService.js";
import { BankDisplay } from "./view/BankDisplay.js";
import { SearchHandler } from "./view/SearchHandler.js";

const bankDisplay = new BankDisplay("bank-display");
const searchHandler = new SearchHandler();

function displayBanksData(banks) {
  if (banks.length > 0) {
    for (let bank of banks) {
      bankDisplay.displayBank(bank);
    }
  }
}

fetchAndProcessAllBankRates()
  .then((banks) => {
    console.log(`Successfully processed ${banks.length} banks`);
    displayBanksData(banks);
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });

searchHandler.setupEventListeners();
