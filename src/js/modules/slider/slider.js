export default class Slider {
    constructor({
        container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animated,
        autoplay,
        buttonsInArray,
        prevBtns = null,
        nextBtns = null
    } = {}) {

        this.container = document.querySelector(container);
        try{this.slides = this.container.children;}catch(e){}
        this.btns = document.querySelectorAll(btns),
        this.prev = document.querySelector(prev),
        this.next = document.querySelector(next),
        this.activeClass = activeClass,
        this.animated = animated,
        this.autoplay = autoplay,
        this.buttonsInArray = buttonsInArray,
        this.slideIndex = 1,
        this.prevBtns = document.querySelectorAll(prevBtns),
        this.nextBtns = document.querySelectorAll(nextBtns);
    }
}