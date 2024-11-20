import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Змініть на відповідний URL вашого API

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

    async createProduct(productData) {
        try {
            const response = await axios.post(`${API_URL}/products`, productData);
            return response.data;
        } catch (error) {
            console.error('Помилка при створенні продукту', error);
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const response = await axios.put(`${API_URL}/products/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error(`Помилка при оновленні продукту з id ${id}`, error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await axios.delete(`${API_URL}/products/${id}`);
        } catch (error) {
            console.error(`Помилка при видаленні продукту з id ${id}`, error);
            throw error;
        }
    }
}
