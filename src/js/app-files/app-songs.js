import texts from '../data-js/data-texts.js';
import Burger from './app-burger.js';

const Songs = document.querySelectorAll('.song');
const MainContent = document.querySelector('.songs');
const PlayBtn = document.querySelector('.text__play-btn');
const myAudio = new Audio();
let isPlay = false;

export default class App {
    constructor() {
        this.createTextView();
        this.setCallback();
        this.createSongPlayer();
    }

    /**
     * @param {HTMLElement}
     */
    createTextView() {
        Songs.forEach((element) => {
            element.addEventListener('click', () => {
                const id = element.id;
                myAudio.src = texts[`${id - 1}`].src;
                myAudio.id = 'audio';
                MainContent.innerHTML = `<div class="text">
                    <div class="btn-wrapper">
                        <div class="text__music">
                            <button class="text__play-btn"></button>
                            <p class="btn-text">Слушать</p>
                        </div>
                        <div class="text__close">
                            <button class="text__back-btn"></button>
                            <p class="back-btn-text">Назад...</p>
                        </div>
                    </div> 
                    <h2 class="text__title"></h2>
                    <p class="text__field">${texts[`${id - 1}`].text}</p>
                    <div class="btn-wrapper">
                        <div class="text__music">
                            <button class="text__play-btn"></button>
                            <p class="btn-text">Слушать</p>
                        </div>
                        <div class="text__close">
                            <button class="text__back-btn"></button>
                            <p class="back-btn-text">Назад...</p>
                        </div>
                    </div>  
                </div>`;
            });
        });
    }

    setCallback() {
        MainContent.addEventListener('click', function (e) {
            if (e.target.classList.contains('text__close') || e.target.closest('.text__close'))
                document.location.reload();
        });
    }

    createSongPlayer() {
        MainContent.addEventListener('click', function (e) {
            if (e.target.classList.contains('text__music') || e.target.closest('.text__music')) {
                if (!isPlay) {
                    myAudio.play();
                    document.querySelectorAll('.text__play-btn').forEach((elem) => elem.classList.add('pause-btn'));
                    document
                        .querySelectorAll('.text__play-btn')
                        .forEach((elem) => elem.classList.remove('text__play-btn'));
                    document.querySelectorAll('.btn-text').forEach((elem) => (elem.textContent = 'Пауза'));
                    isPlay = true;
                } else if (isPlay) {
                    myAudio.pause();
                    document.querySelectorAll('.pause-btn').forEach((elem) => elem.classList.add('text__play-btn'));
                    document.querySelectorAll('.pause-btn').forEach((elem) => elem.classList.remove('pause-btn'));
                    document.querySelectorAll('.btn-text').forEach((elem) => (elem.textContent = 'Слушать'));
                    isPlay = false;
                }
            }
        });
        myAudio.addEventListener('ended', function () {
            document.querySelectorAll('.pause-btn').forEach((elem) => elem.classList.add('text__play-btn'));
            document.querySelectorAll('.pause-btn').forEach((elem) => elem.classList.remove('pause-btn'));
            document.querySelectorAll('.btn-text').forEach((elem) => (elem.textContent = 'Слушать'));
            isPlay = false;
        });
    }
}

const burger = new Burger();
