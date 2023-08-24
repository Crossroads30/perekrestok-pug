const logo = document.querySelector('.burger__line');
const menu = document.querySelector('.burger-menu');
const body = document.body

export default class Burger {
    constructor() {
        this.burgerToOpen();
        this.logo = logo;
        this.menu = menu;
        this.body = body;
    }

    burgerToOpen() {
        document.querySelector('.burger').addEventListener('click', (event) => {
            if (event) {
                this.logo.classList.toggle('burger__open');
                this.menu.classList.toggle('burger-menu__open');
                this.body.classList.toggle("lock");
            }
        });
    }
}
