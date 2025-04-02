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

  displayProvider(provider) {
    if (!this.container) {
      console.error("Container not found");
      return;
    }

    const providerSection = document.createElement("div");
    providerSection.className = "provider-section";

    const providerPhoneNumber = provider.getPhoneNumber();
    const phoneNumberPart = providerPhoneNumber
      ? ` - ${providerPhoneNumber}`
      : "";

    const header = document.createElement("h2");
    header.textContent = `${provider.getName()} - ${provider
      .getBaseCurrency()
      .getCode()} - ${provider.getRatesDate()}${phoneNumberPart}`;

    providerSection.appendChild(header);

    const table = document.createElement("table");
    table.appendChild(
      this.createTableHeaders(provider.getName() === "Česká národní banka")
    );

    const tbody = document.createElement("tbody");
    provider.getAllRates().forEach((rate) => {
      const row = document.createElement("tr");
      const currencyCell = document.createElement("td");
      currencyCell.textContent = rate.getForeignCurrency().getCode();
      row.appendChild(currencyCell);

      if (provider.getName() === "Česká národní banka") {
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

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    providerSection.appendChild(table);
    this.container.appendChild(providerSection);
  }

  clearProviders() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}
