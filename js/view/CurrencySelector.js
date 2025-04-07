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
    this.selectedCurrency = null;
    this.lastSelected = null;
    this.setupEventListeners();
    const initialValue = this.inputElement.value.trim();
    this.selectedCurrency =
      initialValue && initialValue !== "All currencies" ? initialValue : null;
  }

  setupEventListeners() {
    this.inputElement.addEventListener("input", () => this.handleInput());
    this.inputElement.addEventListener("focus", () => this.showDropdown());
    this.dropdownElement.addEventListener("mousedown", (e) => {
      this.lastSelected = e.target;
    });

    this.dropdownElement.addEventListener("mouseup", (e) => {
      if (this.lastSelected === e.target) {
        this.handleSelection(e);
      }
      this.lastSelected = null;
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

    if (event.target.tagName === "DIV") {
      const selectedCode = event.target.textContent;

      if (
        selectedCode === "All currencies" &&
        this.inputElement.value.trim() === ""
      ) {
        this.dropdownElement.classList.remove("show");
        return;
      }
      const newSelectedCurrency =
        selectedCode === "All currencies" ? null : selectedCode;

      if (newSelectedCurrency !== this.selectedCurrency) {
        this.selectedCurrency = newSelectedCurrency;
        this.inputElement.value =
          selectedCode === "All currencies" ? "" : selectedCode;
        this.dropdownElement.classList.remove("show");
        if (this.onSelectCallback) {
          this.onSelectCallback(selectedCode);
        }
      } else {
        if (selectedCode === "All currencies") {
          this.inputElement.value = "";
        }
        this.dropdownElement.classList.remove("show");
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
