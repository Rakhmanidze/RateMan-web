export class RateProviderDisplay {
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
    if (!provider.getAllRates().length) {
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
