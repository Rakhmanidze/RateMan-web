import { CurrencyCode } from "../model/CurrencyCode.js";

export class CurrencySelector {
  constructor(inputElement, dropdownElement, onSelectCallback) {
    this.inputElement = inputElement;
    this.dropdownElement = dropdownElement;
    this.onSelectCallback = onSelectCallback;
    this.allCurrencyCodes = [
      "All currencies",
      ...Array.from(CurrencyCode.VALID_CODES),
    ];
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.inputElement.addEventListener("input", () => this.handleInput());
    this.inputElement.addEventListener("focus", () => this.showDropdown());
    this.dropdownElement.addEventListener("click", (event) =>
      this.handleSelection(event)
    );
    document.addEventListener("click", (event) =>
      this.handleClickOutside(event)
    );
  }

  handleInput() {
    const userInput = this.inputElement.value.toUpperCase().trim();
    const filteredCodes = this.allCurrencyCodes.filter((code) =>
      code.includes(userInput)
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
    if (event.target.tagName === "DIV") {
      const selectedCode = event.target.textContent;
      this.inputElement.value =
        selectedCode === "All currencies" ? "" : selectedCode;
      this.dropdownElement.classList.remove("show");
      if (this.onSelectCallback) {
        this.onSelectCallback(selectedCode);
      }
    }
  }

  handleClickOutside(event) {
    if (
      !this.inputElement.contains(event.target) &&
      !this.dropdownElement.contains(event.target)
    ) {
      this.dropdownElement.classList.remove("show");
    }
  }

  showDropdown() {
    this.populateDropdown(this.allCurrencyCodes);
  }
}
