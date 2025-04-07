export class LogoHandler {
  constructor(filterHandler) {
    this.filterHandler = filterHandler;
    this.setupLogoLink();
  }

  setupLogoLink() {
    const logoLink = document.getElementById("logo-link");
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.filterHandler.reset();
    });
  }
}
