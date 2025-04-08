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
    this.setupEventListeners();
    const initialValue = this.inputElement.value.trim();
    this.selectedCurrency =
      initialValue && initialValue !== "All currencies" ? initialValue : null;
  }

  setupEventListeners() {
    this.inputElement.addEventListener("input", () => this.handleInput());
    this.inputElement.addEventListener("focus", () => this.showDropdown());
    this.dropdownElement.addEventListener("mousedown", (e) => {
      if (e.target === this.dropdownElement) {
        e.preventDefault();
        return;
      }
    });

    this.dropdownElement.addEventListener("click", (e) => {
      if (e.target.tagName === "DIV") {
        this.handleSelection(e);
      }
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

    if (selectedCode === "All currencies" && wasEmpty) {
      this.hideDropdown();
      return;
    }
    const newSelection =
      selectedCode === "All currencies" ? null : selectedCode;
    const selectionChanged = newSelection !== this.selectedCurrency;

    if (selectionChanged) {
      this.selectedCurrency = newSelection;
      this.inputElement.value =
        selectedCode === "All currencies" ? "" : selectedCode;
      this.onSelectCallback?.(selectedCode);
    } else if (selectedCode === "All currencies") {
      this.inputElement.value = "";
    }
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
