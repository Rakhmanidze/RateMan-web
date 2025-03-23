export class BankFilterService {
  constructor() {
    this.originalBanks = [];
  }

  setBanks(banks) {
    this.originalBanks = banks;
  }

  searchBank(searchedBankName) {
    try {
      if (!this.originalBanks || this.originalBanks.length === 0) {
        console.warn("No banks data available");
        return [];
      }

      if (!searchedBankName) {
        return this.originalBanks;
      }

      return this.originalBanks.filter((bank) =>
        bank.getName().toLowerCase().includes(searchedBankName)
      );
    } catch (error) {
      console.error("Error in searchBank:", error);
      return [];
    }
  }

  filterBanks(searchTerm) {
    if (!searchTerm) {
      this.filteredBanks = this.originalBanks;
      return;
    }
  }
}
