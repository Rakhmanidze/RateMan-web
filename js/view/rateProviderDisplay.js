import { getFlagPath } from "../utils/flagUtils.js";

/**
 * Displays rate provider information in the UI
 */
export class RateProviderDisplay {
  /**
   * @param {string} containerId - ID of container element
   */
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Creates table header row with appropriate columns
   * @param {boolean} isCNB - Whether provider is Czech National Bank
   * @returns {HTMLElement} Table header element
   */
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

  /**
   * Creates table row for a currency rate
   * @param {Object} rate - Rate object with currency data
   * @param {boolean} isCNB - Whether provider is Czech National Bank
   * @returns {HTMLElement} Table row element
   */
  createTableRow(rate, isCNB) {
    const row = document.createElement("tr");

    const currencyCell = document.createElement("td");
    const currencyCode = rate.getForeignCurrency().getCode();

    const flagContainer = document.createElement("div");
    flagContainer.className = "flag-container";
    flagContainer.style.backgroundImage = `url(${getFlagPath(currencyCode)})`;
    flagContainer.setAttribute("aria-label", `${currencyCode} flag`);

    currencyCell.appendChild(flagContainer);
    currencyCell.appendChild(document.createTextNode(currencyCode));
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

  /**
   * Creates section with provider header information
   * @param {Object} provider - Provider object with details
   * @returns {HTMLElement} Provider section element
   */
  createProviderSection(provider) {
    const section = document.createElement("div");
    section.className = "provider-section";

    const phoneNumber = provider.getPhoneNumber();
    const phoneNumberPart = phoneNumber ? ` - ${phoneNumber}` : "";

    const header = document.createElement("h2");
    header.textContent = `${provider.getName()} - ${provider.getRatesDate()}${phoneNumberPart}`;

    section.appendChild(header);
    return section;
  }

  /**
   * Creates table with rates for a provider
   * @param {Object} provider - Provider with rate data
   * @param {boolean} isCNB - Whether provider is Czech National Bank
   * @returns {HTMLElement} Rates table element
   */
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

  /**
   * Renders provider data in container
   * @param {Object} provider - Provider to display
   */
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

  /**
   * Clears all provider content from container
   */
  clearProviders() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}
