import { CurrencyCode } from "../model/CurrencyCode.js";
import { CurrencyRate } from "../model/CurrencyRate.js";
import { RateProvider } from "../model/RateProvider.js";
import { phoneNumberData } from "../../sources/config/phoneNumberData.js";
import { API_URL } from "../../sources/config/apiConfig.js";

async function fetchAllProviderRatesData() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching rates data:", error);
    throw error;
  }
}

function processProviderData(data) {
  if (!data || !data.kurzy) {
    console.warn("Invalid provider data received");
    return null;
  }

  try {
    if (
      data.banka === "Turecká centrální banka" ||
      data.banka === "Poštovní spořitelna"
    ) {
      return null;
    }
    if (data.banka === "Česká národní banka") {
      const rates = Object.entries(data.kurzy)
        .map(([currency, rateData]) => {
          const currencyCode = CurrencyCode.create(currency);
          if (!currencyCode) return null;

          const middleRate = rateData.dev_stred;
          if (middleRate === null || middleRate === undefined) return null;

          // For CNB, use the same rate for both buy and sell
          return new CurrencyRate(
            currencyCode,
            parseFloat(middleRate),
            parseFloat(middleRate)
          );
        })
        .filter((rate) => rate !== null);

      if (rates.length === 0) {
        console.warn("No valid rates found for CNB");
        return null;
      }

      let phoneNumber = null;
      for (let provider of phoneNumberData) {
        if (provider.name === data.banka) {
          phoneNumber = provider.phoneNumber;
        }
      }

      return new RateProvider(
        data.banka,
        new CurrencyCode("CZK"),
        rates,
        data.denc,
        phoneNumber
      );
    }

    // Regular handling for other providers
    const rates = Object.entries(data.kurzy)
      .map(([currency, rateData]) => {
        const currencyCode = CurrencyCode.create(currency);
        if (!currencyCode) return null;

        const buyRate =
          rateData.dev_nakup !== null && rateData.dev_nakup !== undefined
            ? parseFloat(rateData.dev_nakup)
            : rateData.val_nakup !== null && rateData.val_nakup !== undefined
            ? parseFloat(rateData.val_nakup)
            : null;

        const sellRate =
          rateData.dev_prodej !== null && rateData.dev_prodej !== undefined
            ? parseFloat(rateData.dev_prodej)
            : rateData.val_prodej !== null && rateData.val_prodej !== undefined
            ? parseFloat(rateData.val_prodej)
            : null;

        if (buyRate === null || sellRate === null) return null;

        return new CurrencyRate(currencyCode, buyRate, sellRate);
      })
      .filter((rate) => rate !== null);

    if (rates.length === 0) {
      console.warn(`No valid rates found for provider: ${data.banka}`);
      return null;
    }

    let phoneNumber = null;
    for (let provider of phoneNumberData) {
      if (provider.name === data.banka) {
        phoneNumber = provider.phoneNumber;
      }
    }

    return new RateProvider(
      data.banka,
      new CurrencyCode("CZK"),
      rates,
      data.denc,
      phoneNumber
    );
  } catch (error) {
    console.error(`Error processing provider ${data.banka}:`, error);
    return null;
  }
}

export async function fetchAndProcessAllProviderRates() {
  try {
    const allProviderData = await fetchAllProviderRatesData();
    const providerDataArray = Array.isArray(allProviderData)
      ? allProviderData
      : [allProviderData];

    const providers = providerDataArray
      .map((providerData) => processProviderData(providerData))
      .filter((provider) => provider !== null);

    return providers;
  } catch (error) {
    console.error("Error fetching provider rates:", error);
    return [];
  }
}
