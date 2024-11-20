import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Змініть на відповідний URL вашого API

export default class ProductManager {
    async fetchProducts(page = 1, limit = 10) {
        try {
            const response = await axios.get(`${API_URL}/products?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Помилка при завантаженні продуктів', error);
            return { products: [], currentPage: 1, totalPages: 1, totalItems: 0 };
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
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/admin/products`, productData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Помилка при створенні продукту', error);
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/admin/products/${id}`, productData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(`Помилка при оновленні продукту з id ${id}`, error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error(`Помилка при видаленні продукту з id ${id}`, error);
            throw error;
        }
    }
}
