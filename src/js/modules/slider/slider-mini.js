import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, prev, next, activeClass, animated, autoplay, buttonsInArray) {
        super(container, prev, next, activeClass, animated, autoplay, buttonsInArray);
    }
    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animated) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
       
        if(!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        if(this.animated) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.buttonsInArray) {
            const newSlides = this.container.querySelectorAll('.feed__item');
           this.container.appendChild(newSlides[0]);
           newSlides.forEach(slide => {
            slide.classList.remove(this.activeClass);
           });
           newSlides[1].classList.add(this.activeClass);
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        } 
    }

    bindTriggers() {
        
        this.next.addEventListener('click', () => this.nextSlide());
    
        this.prev.addEventListener('click', () => {
            if(this.buttonsInArray) {
                const newSlides = this.container.querySelectorAll('.feed__item');
                let active = newSlides[newSlides.length - 1];
                this.container.insertBefore(active, newSlides[0]);
                newSlides.forEach(slide => {
                    slide.classList.remove(this.activeClass);
                });
                active.classList.add(this.activeClass);
            } else {
                let active = this.slides[this.slides.length - 1];
                this.container.insertBefore(active, this.slides[0]);
                this.decorizeSlides();
            }
        }); 
    }

    startAnimation() {
        if(this.autoplay) {
            const animateSlides = setInterval(() => this.nextSlide(), 5000);
            this.container.addEventListener('mouseenter', () => {
                clearInterval(animateSlides);
            });
            this.container.addEventListener('mouseleave', () => {
                this.startAnimation();
            });
        }
        
    }
    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
        this.startAnimation();
        this.bindTriggers();
        this.decorizeSlides();
    }
}