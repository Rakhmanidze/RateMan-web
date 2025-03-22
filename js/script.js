import { fetchAndProcessAllBankRates } from "./service/BankService.js";

fetchAndProcessAllBankRates()
  .then((banks) => {
    console.log(`Successfully processed ${banks.length} banks`);
    banks.forEach((bank) => {
      console.log(`Bank: ${bank.getName()}`);
      console.log(`Number of rates: ${bank.getAllRates().length}`);
      console.log("---");
    });
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });
