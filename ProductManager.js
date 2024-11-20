import axios from 'axios';
import { gsap } from 'gsap';

export default class ProductManager {
    constructor() {
        this.products = [];
    }

    async fetchProducts() {
        try {
            const response = await axios.get('/api/products');
            this.products = response.data;
            return this.products;
        } catch (error) {
            console.error('Помилка завантаження продуктів', error);
            return [];
        }
    }

    applyAnimations(productElement) {
        gsap.from(productElement, {
            opacity: 0,
            y: 50,
            duration: 0.5
        });
    }
}