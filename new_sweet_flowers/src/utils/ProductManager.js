import axios from 'axios';

export default class ProductManager {
    constructor() {
        this.products = [];
    }

    async fetchProducts() {
        try {
            // В реальному проекті тут був би запит до API
            // const response = await axios.get('/api/products');
            // this.products = response.data;

            // Для прикладу використаємо моковані дані
            this.products = [
                { id: 1, name: 'Букет "Рожева мрія"', price: 500, imageUrl: '/images/bouquet1.jpg', description: 'Ніжний букет з рожевих зефірних квітів' },
                { id: 2, name: 'Букет "Ніжність"', price: 450, imageUrl: '/images/bouquet2.jpg', description: 'Елегантний букет з білих та рожевих зефірних квітів' },
                { id: 3, name: 'Букет "Святковий"', price: 600, imageUrl: '/images/bouquet3.jpg', description: 'Яскравий букет з різнокольорових зефірних квітів' },
            ];

            return this.products;
        } catch (error) {
            console.error('Помилка при завантаженні продуктів', error);
            return [];
        }
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
}
