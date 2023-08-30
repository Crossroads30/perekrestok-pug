import cards from '../data-js/data.js';
import Burger from './app-burger.js';

const Videos = document.querySelectorAll('.videos__list-item');
const MainContent = document.querySelector('.videos');

export default class App {
    constructor() {
        // this.setRouter();
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

    setRouter() {
        document.addEventListener('click', event => {
            // console.log(event.target.tagName);
            if (event.target.tagName === 'A') { 
                route(event);
            }
            event.preventDefault();
        });

        const route = (event) => {
            window.history.pushState({}, '', event.target.href);
            handleLocation();
        }

        const router = {
            '/': 'videos.html',
            '/video': 'video.html'
        }

        const handleLocation = async() => {
            const path = window.location.pathname;
            const html = await fetch(router[path]).then((data) => data.text());
            document.querySelector('.videos').innerHTML = html;
        }
        document.querySelector('.videos').onpopstate = handleLocation();
        document.querySelector('.videos').route = route;
        handleLocation();
    }
}

const burger = new Burger();