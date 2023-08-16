import cards from '../data-js/data.js';

const Videos = document.querySelectorAll('.videos__list-item');
const MainContent = document.querySelector('.videos');

export default class App {
    constructor() {
        this.createYoutubeView();
        this.setCallback();
    }

    /**
     * @param {HTMLElement}
     */
    createYoutubeView() {
        Videos.forEach((element) => {
            element.addEventListener('click', () => {
                const id = element.id;
                MainContent.innerHTML = `<div class="video__wrapper">
                    <div class="video__field">
                        <iframe class="iframe" src="${
                            cards[`${id - 1}`].youtubeUrl
                        }?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <button class="back-btn">Назад...</button>
                </div>`;
            });
        });
    }

    setCallback() {
        MainContent.addEventListener('click', function (e) {
            if (e.target.classList.contains('back-btn') || e.target.closest('.back-btn')) document.location.reload();
        });
    }
}
