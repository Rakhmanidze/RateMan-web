// constants.js
const PROVIDER_TYPE = {
  BANK: "bank",
  EXCHANGE: "exchange",
  CRYPTO_EXCHANGE: "crypto-exchange",
};

const FILTER_PROVIDER_TYPE = {
  ALL: "all",
  BANKS: "banks",
  EXCHANGES: "exchanges",
  CRYPTO_EXCHANGES: "crypto-exchanges",
};

const SORT_OPTIONS = {
  NO_SORT: "noRate",
  BEST_BUY: "best-buy-rate",
  BEST_SELL: "best-sell-rate",
};

// CurrencyCode.js
class CurrencyCode {
  static VALID_CODES = new Set([
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "INR",
    "NZD",
    "SGD",
    "HKD",
    "KRW",
    "TRY",
    "RUB",
    "BRL",
    "ZAR",
    "MXN",
    "SAR",
    "AED",
    "CZK",
    "DKK",
    "NOK",
    "SEK",
    "PLN",
    "HUF",
    "RON",
    "BGN",
    "HRK",
    "RSD",
    "ALL",
    "MDL",
    "UAH",
    "ISK",
    "MKD",
    "BYN",
    "AZN",
    "AMD",
    "GEL",
    "KZT",
    "TJS",
    "TMT",
    "UZS",
    "KGS",
    "THB",
    "MYR",
    "IDR",
    "PHP",
    "PKR",
    "BDT",
    "LKR",
    "MMK",
    "KHR",
    "LAK",
    "MNT",
    "NPR",
    "BTN",
    "AFN",
    "VND",
    "KPW",
    "MOP",
    "TWD",
    "ILS",
    "JOD",
    "LBP",
    "KWD",
    "BHD",
    "OMR",
    "QAR",
    "IRR",
    "IQD",
    "YER",
    "SYP",
    "EGP",
    "MAD",
    "TND",
    "DZD",
    "LYD",
    "SDG",
    "ETB",
    "KES",
    "UGX",
    "TZS",
    "NGN",
    "GHS",
    "XOF",
    "XAF",
    "BWP",
    "NAD",
    "SZL",
    "LSL",
    "MUR",
    "SCR",
    "MGA",
    "ZMW",
    "AOA",
    "CDF",
    "DJF",
    "ERN",
    "GMD",
    "GNF",
    "LRD",
    "MZN",
    "RWF",
    "SLL",
    "SOS",
    "SSP",
    "STN",
    "ARS",
    "CLP",
    "COP",
    "PEN",
    "UYU",
    "PYG",
    "BOB",
    "VES",
    "CRC",
    "HNL",
    "NIO",
    "DOP",
    "JMD",
    "TTD",
    "BBD",
    "GYD",
    "SRD",
    "BZD",
    "HTG",
    "CUP",
    "XCD",
    "ANG",
    "AWG",
    "KYD",
    "BSD",
    "BMD",
    "FKP",
    "GIP",
    "SHP",
    "XDR",
    "BAM",
  ]);

  constructor(code) {
    if (typeof code !== "string") {
      throw new Error("Currency code must be a string");
    }
    if (!CurrencyCode.VALID_CODES.has(code.toUpperCase())) {
      throw new Error(`Invalid currency code: ${code}`);
    }
    this.code = code.toUpperCase();
  }

  getCode() {
    return this.code;
  }

  equals(other) {
    if (!(other instanceof CurrencyCode)) {
      return false;
    }
    return this.code === other.code;
  }

  toString() {
    return this.code;
  }

  static create(currency) {
    try {
      return new CurrencyCode(currency);
    } catch (error) {
      console.warn(`Skipping unsupported currency: ${currency}`);
      return null;
    }
  }
}

// CurrencyRate.js
class CurrencyRate {
  constructor(foreignCurrency, buyRate, sellRate) {
    if (!(foreignCurrency instanceof CurrencyCode)) {
      throw new Error("foreignCurrency must be an instance of CurrencyCode");
    }
    if (typeof buyRate !== "number") {
      throw new Error("buyRate must be a number");
    }
    if (typeof sellRate !== "number") {
      throw new Error("sellRate must be a number");
    }
    if (buyRate <= 0 || sellRate <= 0) {
      throw new Error("Rates must be positive numbers");
    }
    if (sellRate < buyRate) {
      throw new Error("Sell rate cannot be lower than buy rate");
    }
    this.foreignCurrency = foreignCurrency;
    this.buyRate = buyRate;
    this.sellRate = sellRate;
  }

  getForeignCurrency() {
    return this.foreignCurrency;
  }

  getBuyRate() {
    return this.buyRate;
  }

  getSellRate() {
    return this.sellRate;
  }
}

// FilterState.js
class FilterState {
  constructor() {
    this.searchProviderName = localStorage.getItem("searchProviderName") || "";
    this.currency = localStorage.getItem("currency") || "";
    this.providerType = localStorage.getItem("providerType") || "all";
    this.sortBy = localStorage.getItem("sortBy") || "noRateSorting";
  }

  setSearchedProviderName(name) {
    this.searchProviderName = name;
    localStorage.setItem("searchProviderName", name);
  }

  getSearchedProviderName() {
    return this.searchProviderName;
  }

  setCurrency(pair) {
    this.currency = pair;
    localStorage.setItem("currency", pair);
  }

  getCurrency() {
    return this.currency;
  }

  setProviderType(type) {
    this.providerType = type;
    localStorage.setItem("providerType", type);
  }

  getProviderType() {
    return this.providerType;
  }

  setSortBy(sort) {
    this.sortBy = sort;
    localStorage.setItem("sortBy", sort);
  }

  getSortBy() {
    return this.sortBy;
  }

  clearAllFilters() {
    this.setSearchedProviderName("");
    this.setCurrency("");
    this.setProviderType("all");
    this.setSortBy("noRateSorting");
  }
}

// RateProvider.js
const VALID_TYPES = Object.values(PROVIDER_TYPE);

class RateProvider {
  constructor(name, baseCurrency, rates, ratesDate, phoneNumber, type) {
    if (typeof name !== "string") {
      throw new Error("RateProvider name must be a string");
    }
    if (!(baseCurrency instanceof CurrencyCode)) {
      throw new Error("baseCurrency must be an instance of CurrencyCode");
    }
    if (!Array.isArray(rates)) {
      throw new Error("rates must be an array");
    }
    if (!rates.every((rate) => rate instanceof CurrencyRate)) {
      throw new Error("All rates must be instances of CurrencyRate");
    }
    if (typeof ratesDate !== "string") {
      throw new Error("ratesDate must be a string");
    }
    if (!VALID_TYPES.includes(type)) {
      throw new Error("Invalid provider type");
    }
    this.name = name;
    this.baseCurrency = baseCurrency;
    this.rates = rates;
    this.ratesDate = ratesDate;
    this.phoneNumber = phoneNumber;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  getBaseCurrency() {
    return this.baseCurrency;
  }

  getRate(currencyCode) {
    if (!(currencyCode instanceof CurrencyCode)) {
      throw new Error("currencyCode must be an instance of CurrencyCode");
    }
    return this.rates.find(
      (rate) => rate.getForeignCurrency().getCode() === currencyCode.getCode()
    );
  }

  getAllRates() {
    return this.rates;
  }

  getRatesDate() {
    return this.ratesDate;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getType() {
    return this.type;
  }
}

// apiConfig.js
const API_URL = "https://data.kurzy.cz/json/meny/b[-1].json";

// bankNames.js
const bankNames = [
  "Komerční banka",
  "Česká národní banka",
  "Fio banka",
  "Raiffeisenbank",
  "ČSOB",
  "UniCredit Bank",
  "mBank",
  "Air bank",
  "Max banka",
  "Trinity Bank",
  "MONETA",
  "Oberbank AG",
  "Česká spořitelna",
];

// phoneNumberData.js
const phoneNumberData = [
  { name: "AKCENTA CZ", phoneNumber: "+420 498 777 770" },
  { name: "Směnárna Nekázanka Exchange", phoneNumber: "+420 773 152 658" },
  { name: "Eurowex", phoneNumber: "+420 725 800 800" },
  { name: "RoklenFX", phoneNumber: "+420 236 071 600" },
  { name: "Komerční banka", phoneNumber: "+420 955 559 550" },
  { name: "Směnárna PETRA FINANCE", phoneNumber: "+420 602 453 201" },
  { name: "MONETA", phoneNumber: "+420 224 443 636" },
  { name: "Fio banka", phoneNumber: "+420 224 346 800" },
  { name: "Raiffeisenbank", phoneNumber: "+420 412 440 000" },
  { name: "ČSOB", phoneNumber: "+420 495 300 300" },
  { name: "UniCredit Bank", phoneNumber: "+420 221 210 031" },
  { name: "mBank", phoneNumber: "+420 222 111 999" },
  { name: "Oberbank AG", phoneNumber: "+420 387 717 153" },
  { name: "Česká národní banka", phoneNumber: "+420 224 411 111" },
  { name: "Air bank", phoneNumber: "+420 515 202 202" },
  { name: "Max banka", phoneNumber: "+420 233 233 233" },
  { name: "Česká spořitelna", phoneNumber: "+420 277 207 207" },
  { name: "Trinity Bank", phoneNumber: "+420 800 678 678" },
];

// RateProviderService.js
async function fetchAllProviderRatesData() {
  if (!navigator.onLine) {
    console.log("No internet connection detected. Using cached data.");
    return loadDataFromLocalStorage();
  }
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      mode: "cors",
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`
      );
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0 || !data[0].kurzy) {
      throw new Error(
        "Invalid API response structure: Expected an array with 'kurzy' properties"
      );
    }
    localStorage.setItem("apiData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Fetch failed:", {
      message: error.message,
      stack: error.stack,
      url: API_URL,
    });
    console.log("Falling back to cached data due to fetch error.");
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
      data.banka === "Poštovní spořitelna" ||
      data.banka === "Prepocet EURa"
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

async function fetchAndProcessAllProviderRates() {
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

// RateProviderFilterService.js
class RateProviderFilterService {
  constructor() {
    this.originalProviders = [];
  }

  setProviders(providers) {
    this.originalProviders = providers;
  }

  filterProviders({ providerType = "all", searchTerm = "", currency = "" }) {
    try {
      if (!this.originalProviders?.length) {
        return [];
      }
      let filteredProviders = [...this.originalProviders];
      if (providerType !== FILTER_PROVIDER_TYPE.ALL) {
        filteredProviders = filteredProviders.filter((provider) => {
          const currentProviderType = provider.getType();
          if (providerType === FILTER_PROVIDER_TYPE.BANKS) {
            return currentProviderType === PROVIDER_TYPE.BANK;
          } else if (providerType === FILTER_PROVIDER_TYPE.EXCHANGES) {
            return currentProviderType === PROVIDER_TYPE.EXCHANGE;
          } else if (providerType === FILTER_PROVIDER_TYPE.CRYPTO_EXCHANGES) {
            return currentProviderType === PROVIDER_TYPE.CRYPTO_EXCHANGE;
          }
        });
      }
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredProviders = filteredProviders.filter((provider) =>
          provider.getName().toLowerCase().includes(lowerSearchTerm)
        );
      }
      if (currency && currency !== "All currencies" && currency !== "") {
        filteredProviders = filteredProviders
          .map((provider) => {
            const existingRate = provider
              .getAllRates()
              .find((rate) => rate.getForeignCurrency().getCode() === currency);
            if (!existingRate) return null;
            return new RateProvider(
              provider.getName(),
              provider.getBaseCurrency(),
              [existingRate],
              provider.getRatesDate(),
              provider.getPhoneNumber(),
              provider.getType()
            );
          })
          .filter((provider) => provider !== null);
      }
      return filteredProviders;
    } catch (error) {
      console.error("Error in filterProviders:", error);
      return [];
    }
  }
}

// CurrencySelector.js
class CurrencySelector {
  static ALL_OPTION = "All currencies";

  constructor(inputElement, dropdownElement, onSelectCallback) {
    this.inputElement = inputElement;
    this.dropdownElement = dropdownElement;
    this.onSelectCallback = onSelectCallback;
    this.allCurrencyCodes = [
      CurrencySelector.ALL_OPTION,
      ...Array.from(CurrencyCode.VALID_CODES),
    ];
    this.selectedCurrency = null;
    this.setupEventListeners();
    const initialValue = this.inputElement.value.trim();
    this.selectedCurrency =
      initialValue && initialValue !== CurrencySelector.ALL_OPTION
        ? initialValue
        : null;
  }

  setupEventListeners() {
    let initialSelection = null;
    this.inputElement.addEventListener("input", () => this.handleInput());
    this.inputElement.addEventListener("focus", () => this.showDropdown());
    this.dropdownElement.addEventListener("mousedown", (e) => {
      if (e.target === this.dropdownElement) {
        e.preventDefault();
        return;
      }
      if (e.target.tagName === "DIV") {
        initialSelection = e.target;
      }
    });
    this.dropdownElement.addEventListener("click", (e) => {
      if (initialSelection && e.target === initialSelection) {
        this.handleSelection(e);
      }
      initialSelection = null;
    });
    document.addEventListener("click", (event) =>
      this.handleClickOutside(event)
    );
  }

  handleInput() {
    const userInput = this.inputElement.value.toUpperCase().trim();
    const filteredCodes = this.allCurrencyCodes.filter((code) =>
      code.toUpperCase().includes(userInput)
    );
    this.populateDropdown(filteredCodes);
  }

  populateDropdown(codes) {
    this.dropdownElement.innerHTML = "";
    codes.forEach((code) => {
      const div = document.createElement("div");
      div.textContent = code;
      this.dropdownElement.appendChild(div);
    });
    this.dropdownElement.classList.add("show");
  }

  handleSelection(event) {
    if (event.button === 2) return;
    const selectedCode = event.target.textContent;
    const wasEmpty = this.inputElement.value.trim() === "";
    if (selectedCode === CurrencySelector.ALL_OPTION && wasEmpty) {
      this.hideDropdown();
      return;
    }
    const newSelection =
      selectedCode === CurrencySelector.ALL_OPTION ? null : selectedCode;
    const selectionChanged = newSelection !== this.selectedCurrency;
    this.selectedCurrency = newSelection;
    this.inputElement.value =
      selectedCode === CurrencySelector.ALL_OPTION ? "" : selectedCode;
    this.onSelectCallback?.(
      selectedCode === CurrencySelector.ALL_OPTION ? null : selectedCode
    );
    this.hideDropdown();
  }

  handleClickOutside(event) {
    if (
      !this.inputElement.contains(event.target) &&
      !this.dropdownElement.contains(event.target)
    ) {
      this.hideDropdown();
    }
  }

  showDropdown() {
    this.populateDropdown(this.allCurrencyCodes);
  }

  hideDropdown() {
    this.dropdownElement.classList.remove("show");
  }
}

// FilterHandler.js
class FilterHandler {
  constructor(providerFilterService, providerDisplay, filterState) {
    this.providerSearchInput = document.getElementById("provider-search");
    this.currencyInput = document.getElementById("select-currency");
    this.providerFilterDropdown = document.getElementById("provider-filter");
    this.bestRateDropdown = document.getElementById("best-rate");
    this.providerDisplay = providerDisplay;
    this.providerFilterService = providerFilterService;
    this.filterState = filterState;
    this.currencySelector = new CurrencySelector(
      document.getElementById("select-currency"),
      document.getElementById("currency-dropdown"),
      (selectedCode) => {
        this.filterState.setCurrency(selectedCode || "");
        this.applyAllFilters();
      }
    );
    this.noResultsMessage = document.createElement("div");
    this.noResultsMessage.className = "no-results";
    this.initializeFromState();
    this.setupEventListeners();
  }

  initializeFromState() {
    this.providerSearchInput.value = this.filterState.getSearchedProviderName();
    this.providerFilterDropdown.value = this.filterState.getProviderType();
    this.currencyInput.value = this.filterState.getCurrency() || "";
    this.applyAllFilters();
  }

  setupEventListeners() {
    this.providerSearchInput.addEventListener("input", (event) => {
      this.filterState.setSearchedProviderName(event.target.value);
      this.applyAllFilters();
    });
    this.providerFilterDropdown.addEventListener("change", (event) => {
      this.filterState.setProviderType(event.target.value);
      this.applyAllFilters();
    });
    this.bestRateDropdown.addEventListener("change", (event) => {
      this.sortByBestRate(event.target.value);
    });
  }

  applyAllFilters() {
    const filters = {
      providerType: this.filterState.getProviderType(),
      searchTerm: this.filterState.getSearchedProviderName(),
      currency: this.filterState.getCurrency(),
    };
    const filteredProviders =
      this.providerFilterService.filterProviders(filters);
    this.updateDisplay(filteredProviders);
  }

  sortByBestRate(sortType) {
    const currency = this.filterState.getCurrency();
    if (!currency) {
      return;
    }
    const filters = {
      providerType: this.filterState.getProviderType(),
      searchTerm: this.filterState.getSearchedProviderName(),
      currency: currency,
    };
    let filteredProviders = this.providerFilterService.filterProviders(filters);
    if (filteredProviders && filteredProviders.length >= 2) {
      if (sortType === SORT_OPTIONS.BEST_BUY) {
        this.sortByRate(filteredProviders, currency, "buy");
      } else if (sortType === SORT_OPTIONS.BEST_SELL) {
        this.sortByRate(filteredProviders, currency, "sell");
      }
      this.updateDisplay(filteredProviders);
    } else {
      this.updateDisplay(filteredProviders);
    }
  }

  sortByRate(providers, currency, buyOrSell) {
    providers.sort((providerA, providerB) => {
      let rateA, rateB;
      if (buyOrSell === "buy") {
        rateA = this.getBuyRate(providerA, currency);
        rateB = this.getBuyRate(providerB, currency);
        return rateA - rateB;
      } else {
        rateA = this.getSellRate(providerA, currency);
        rateB = this.getSellRate(providerB, currency);
        return rateB - rateA;
      }
    });
  }

  getBuyRate(provider, currency) {
    const currencyCode = new CurrencyCode(currency);
    const rate = provider.getRate(currencyCode);
    return rate ? rate.getBuyRate() : 0;
  }

  getSellRate(provider, currency) {
    const currencyCode = new CurrencyCode(currency);
    const rate = provider.getRate(currencyCode);
    return rate ? rate.getSellRate() : 0;
  }

  updateDisplay(providers) {
    this.providerDisplay.clearProviders();
    const currency = this.filterState.getCurrency();
    const isCertainCurrency =
      currency && currency !== "All currencies" && currency !== null;
    const providerCount = providers ? providers.length : 0;
    const IsbestRateDropdown = isCertainCurrency && providerCount >= 2;
    if (IsbestRateDropdown) {
      this.bestRateDropdown.classList.remove("hidden");
    } else {
      this.bestRateDropdown.classList.add("hidden");
    }
    if (!providers || providers.length === 0) {
      this.noResultsMessage.textContent = "No results found";
      this.providerDisplay.container.appendChild(this.noResultsMessage);
    } else {
      this.noResultsMessage.remove();
      providers.forEach((provider) =>
        this.providerDisplay.displayProvider(provider)
      );
    }
  }

  reset() {
    this.filterState.setCurrency("All currencies");
    this.filterState.setSearchedProviderName("");
    this.filterState.setProviderType("all");
    this.providerSearchInput.value = "";
    this.providerFilterDropdown.value = FILTER_PROVIDER_TYPE.ALL;
    this.currencyInput.value = "";
    this.bestRateDropdown.value = SORT_OPTIONS.NO_SORT;
    this.applyAllFilters();
  }
}

// LogoHandler.js
class LogoHandler {
  constructor(filterHandler) {
    this.filterHandler = filterHandler;
    this.setupLogoLink();
  }

  setupLogoLink() {
    const logoLink = document.getElementById("logo-link");
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.filterHandler.reset();
    });
  }
}

// RateProviderDisplay.js
class RateProviderDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  createTableHeaders(isCNB) {
    const headers = isCNB
      ? ["Currency", "Middle Rate"]
      : ["Currency", "Buy Rate", "Sell Rate"];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headers.forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    return thead;
  }

  createTableRow(rate, isCNB) {
    const row = document.createElement("tr");
    const currencyCell = document.createElement("td");
    currencyCell.textContent = rate.getForeignCurrency().getCode();
    row.appendChild(currencyCell);
    if (isCNB) {
      const middleRateCell = document.createElement("td");
      middleRateCell.textContent = rate.getBuyRate().toFixed(4);
      row.appendChild(middleRateCell);
    } else {
      const buyRateCell = document.createElement("td");
      buyRateCell.textContent = rate.getBuyRate().toFixed(4);
      row.appendChild(buyRateCell);
      const sellRateCell = document.createElement("td");
      sellRateCell.textContent = rate.getSellRate().toFixed(4);
      row.appendChild(sellRateCell);
    }
    return row;
  }

  createProviderSection(provider) {
    const section = document.createElement("div");
    section.className = "provider-section";
    const phoneNumber = provider.getPhoneNumber();
    const phoneNumberPart = phoneNumber ? ` - ${phoneNumber}` : "";
    const header = document.createElement("h2");
    header.textContent = `${provider.getName()} - ${provider
      .getBaseCurrency()
      .getCode()} - ${provider.getRatesDate()}${phoneNumberPart}`;
    section.appendChild(header);
    return section;
  }

  createTable(provider, isCNB) {
    const table = document.createElement("table");
    table.appendChild(this.createTableHeaders(isCNB));
    const tbody = document.createElement("tbody");
    provider.getAllRates().forEach((rate) => {
      tbody.appendChild(this.createTableRow(rate, isCNB));
    });
    table.appendChild(tbody);
    return table;
  }

  displayProvider(provider) {
    if (!this.container) {
      console.error("Container not found");
      return;
    }
    const isCNB = provider.getName() === "Česká národní banka";
    const providerSection = this.createProviderSection(provider);
    providerSection.appendChild(this.createTable(provider, isCNB));
    this.container.appendChild(providerSection);
  }

  clearProviders() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}

// script.js
const providerDisplay = new RateProviderDisplay("provider-display");
const providerFilterService = new RateProviderFilterService();
const filterState = new FilterState();
const filterHandler = new FilterHandler(
  providerFilterService,
  providerDisplay,
  filterState
);
new LogoHandler(filterHandler);
fetchAndProcessAllProviderRates()
  .then((providers) => {
    providerFilterService.setProviders(providers);
    filterHandler.applyAllFilters();
  })
  .catch((error) => {
    console.error("Error in main process:", error);
  });
