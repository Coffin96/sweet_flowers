class Slider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.slides = this.slider.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.init();
    }

    init() {
        setInterval(() => this.nextSlide(), 5000);
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Slider('.hero-slider .slider');
});