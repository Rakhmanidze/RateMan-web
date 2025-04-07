export class LogoHandler {
  constructor(filterState, filterHandler) {
    this.filterState = filterState;
    this.filterHandler = filterHandler;
    this.setupLogoLink();
  }

  setupLogoLink() {
    const logoLink = document.getElementById("logo-link");
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.filterState.setCurrency("All currencies");
      this.filterState.setSearchedProviderName("");
      this.filterState.setProviderType("all");
      this.filterHandler.applyAllFilters();
    });
  }
}
