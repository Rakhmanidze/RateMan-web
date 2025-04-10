import { CurrencyCode } from "../model/CurrencyCode.js";
import { CurrencyRate } from "../model/CurrencyRate.js";
import { RateProvider } from "../model/RateProvider.js";
import { phoneNumberData } from "../../sources/config/phoneNumberData.js";
import { API_URL } from "../../sources/config/apiConfig.js";
import { bankNames } from "../../sources/config/bankNames.js";

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
    const data = await response.json();
    if (!data || !data.kurzy) {
      throw new Error("Invalid API response structure");
    }

    localStorage.setItem("apiData", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching rates data:", error);
    return loadDataFromLocalStorage();
  }
}

function loadDataFromLocalStorage() {
  const storedData = localStorage.getItem("apiData");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
}

function createRates(kurzy, isCNB) {
  return Object.entries(kurzy)
    .map(([currency, rateData]) => {
      const currencyCode = CurrencyCode.create(currency);
      if (!currencyCode) return null;

      if (isCNB) {
        const middleRate = rateData.dev_stred;
        if (middleRate === null || middleRate === undefined) return null;
        return new CurrencyRate(
          currencyCode,
          parseFloat(middleRate),
          parseFloat(middleRate)
        );
      }

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
}

function createProvider(name, rates, date, phoneNumber, isBank) {
  const type = isBank ? "bank" : "exchange";
  return new RateProvider(
    name,
    new CurrencyCode("CZK"),
    rates,
    date,
    phoneNumber,
    type
  );
}

function getPhoneNumber(providerName, phoneData) {
  const provider = phoneData.find((p) => p.name === providerName);
  return provider ? provider.phoneNumber : null;
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
    const isBank = bankNames.includes(data.banka);
    const isCNB = data.banka === "Česká národní banka";
    const rates = createRates(data.kurzy, isCNB);

    if (rates.length === 0) {
      return null;
    }

    const phoneNumber = getPhoneNumber(data.banka, phoneNumberData);
    return createProvider(data.banka, rates, data.denc, phoneNumber, isBank);
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
