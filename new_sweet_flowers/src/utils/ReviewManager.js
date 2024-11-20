import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default class ReviewManager {
    async fetchAllReviews() {
        try {
            const response = await axios.get(`${API_URL}/admin/reviews`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching all reviews', error);
            throw error;
        }
    }

    async updateReview(id, reviewData) {
        try {
            const response = await axios.put(`${API_URL}/admin/reviews/${id}`, reviewData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating review', error);
            throw error;
        }
    }

    async deleteReview(id) {
        try {
            await axios.delete(`${API_URL}/admin/reviews/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (error) {
            console.error('Error deleting review', error);
            throw error;
        }
    }
}
