import axios from 'axios';

const API_URL = 'https://api.example.com'; // Замініть на URL вашого API

export default class ProductManager {
    async fetchProducts() {
        try {
            const response = await axios.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            console.error('Помилка при завантаженні продуктів', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Помилка при завантаженні продукту з id ${id}`, error);
            return null;
        }
    }
}
