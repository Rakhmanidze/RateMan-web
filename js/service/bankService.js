import { CurrencyCode } from "../model/CurrencyCode.js";
import { CurrencyRate } from "../model/CurrencyRate.js";
import { Bank } from "../model/Bank.js";

async function fetchAllBankRatesData() {
  const response = await fetch(`https://data.kurzy.cz/json/meny/b[-1].json`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Status code isn't 200: ${response.status}`);
  }
  return response.json();
}

function processBankData(data) {
  if (!data || !data.kurzy) {
    console.warn("Invalid bank data received");
    return null;
  }

  try {
    const rates = Object.entries(data.kurzy)
      .map(([currency, rateData]) => {
        const currencyCode = CurrencyCode.create(currency);
        if (!currencyCode) return null;

        // Handle both dev_nakup/dev_prodej and val_nakup/val_prodej
        const buyRate =
          rateData.dev_nakup !== null && rateData.dev_nakup !== undefined
            ? parseFloat(rateData.dev_nakup)
            : parseFloat(rateData.val_nakup);
        const sellRate =
          rateData.dev_prodej !== null && rateData.dev_prodej !== undefined
            ? parseFloat(rateData.dev_prodej)
            : parseFloat(rateData.val_prodej);

        if (isNaN(buyRate) || isNaN(sellRate)) return null;

        return new CurrencyRate(currencyCode, buyRate, sellRate);
      })
      .filter((rate) => rate !== null);

    if (rates.length === 0) {
      console.warn(`No valid rates found for bank: ${data.banka}`);
      return null;
    }

    return new Bank(data.banka, new CurrencyCode("CZK"), rates);
  } catch (error) {
    console.error(`Error processing bank ${data.banka}:`, error);
    return null;
  }
}

export async function fetchAndProcessAllBankRates() {
  try {
    const allBankData = await fetchAllBankRatesData();
    const bankDataArray = Array.isArray(allBankData)
      ? allBankData
      : [allBankData];
    const banks = bankDataArray
      .map((bankData) => processBankData(bankData))
      .filter((bank) => bank !== null);

    return banks;
  } catch (error) {
    console.error("Error fetching or processing bank rates:", error);
    return [];
  }
}
