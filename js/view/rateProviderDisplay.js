export class RateProviderDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  displayProvider(provider) {
    if (!this.container) {
      console.error("Container not found");
      return;
    }

    const providerSection = document.createElement("div");
    providerSection.className = "provider-section";

    const header = document.createElement("h2");
    header.textContent = `${provider.getName()} - ${provider
      .getBaseCurrency()
      .getCode()} - ${provider.getRatesDate()}`;
    providerSection.appendChild(header);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    // Special handling for CNB
    if (provider.getName() === "Česká národní banka") {
      const headers = ["Currency", "Middle Rate"];
      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
    } else {
      const headers = ["Currency", "Buy Rate", "Sell Rate"];
      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

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
