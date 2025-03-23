export class BankDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  displayBank(bank) {
    if (!this.container) {
      console.error("Bank display container not found");
      return;
    }

    const bankSection = document.createElement("div");
    bankSection.className = "bank-section";

    // Create header
    const header = document.createElement("h2");
    header.textContent = `${bank.getName()} (${bank
      .getBaseCurrency()
      .getCode()}/${bank.getRatesDate()})`;
    bankSection.appendChild(header);

    // Create table
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table headers based on bank type
    const headerRow = document.createElement("tr");
    const currencyHeader = document.createElement("th");
    currencyHeader.textContent = "Currency";
    headerRow.appendChild(currencyHeader);

    if (bank.getName() === "Česká národní banka") {
      // CNB table headers - single middle rate column
      const middleRateHeader = document.createElement("th");
      middleRateHeader.textContent = "Middle Rate";
      headerRow.appendChild(middleRateHeader);
    } else {
      // Regular bank table headers - buy and sell columns
      const buyRateHeader = document.createElement("th");
      buyRateHeader.textContent = "Buy Rate";
      headerRow.appendChild(buyRateHeader);

      const sellRateHeader = document.createElement("th");
      sellRateHeader.textContent = "Sell Rate";
      headerRow.appendChild(sellRateHeader);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Add rate rows
    bank.getAllRates().forEach((rate) => {
      const row = document.createElement("tr");
      const currencyCell = document.createElement("td");
      currencyCell.textContent = rate.getForeignCurrency().getCode();
      row.appendChild(currencyCell);

      if (bank.getName() === "Česká národní banka") {
        // CNB table row - single middle rate
        const middleRateCell = document.createElement("td");
        middleRateCell.textContent = rate.getBuyRate().toFixed(4);
        row.appendChild(middleRateCell);
      } else {
        // Regular bank table row - buy and sell rates
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
    bankSection.appendChild(table);
    this.container.appendChild(bankSection);
  }

  clearBanks() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}
