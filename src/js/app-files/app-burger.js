const logo = document.querySelector('.burger__line');
const menu = document.querySelector('.burger-menu');

export default class Burger {
  constructor() {
    this.burgerToOpen();
    this.logo = logo;
    this.menu = menu;
  }

  burgerToOpen() {
    document.querySelector('.burger').addEventListener('click', (event) => {
      if (event) {
          this.logo.classList.toggle('burger__open');
          this.menu.classList.toggle('burger-menu__open');
      }
  });
  }
}