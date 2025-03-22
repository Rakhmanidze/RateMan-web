export class BankDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  displayBank(bank) {
    if (!this.container) {
      console.error("Container not found");
      return;
    }

    const bankSection = document.createElement("div");
    bankSection.className = "bank-section";

    const header = document.createElement("h2");
    header.textContent = `${bank.getName()} (Base: ${bank
      .getBaseCurrency()
      .getCode()})`;
    bankSection.appendChild(header);

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Currency</th>
                <th>Buy Rate</th>
                <th>Sell Rate</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    bankSection.appendChild(table);

    const tbody = table.querySelector("tbody");
    bank.getAllRates().forEach((rate) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${rate.getForeignCurrency().getCode()}</td>
          <td>${rate.getBuyRate()}</td>
          <td>${rate.getSellRate()}</td>
      `;
      tbody.appendChild(row);
    });

    this.container.appendChild(bankSection);
  }

  clearBanks() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}
