import { CurrencyCode } from "../model/CurrencyCode.js";

export class CurrencySelector {
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
