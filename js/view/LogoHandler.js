/**
 * Handles logo click events to reset filters
 */
export class LogoHandler {
  /**
   * @param {Object} filterHandler - Handler for resetting filters
   */
  constructor(filterHandler) {
    this.filterHandler = filterHandler;
    this.setupLogoLink();
  }

  /**
   * Sets up event listener for logo click to reset filters
   */
  setupLogoLink() {
    const logoLink = document.getElementById("logo-link");
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.filterHandler.reset();
    });
  }
}
