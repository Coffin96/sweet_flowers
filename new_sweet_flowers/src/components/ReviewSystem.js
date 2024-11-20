import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReviewSystem.scss';

const API_URL = 'https://api.example.com'; // Замініть на URL вашого API

const ReviewSystem = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newReview, setNewReview] = useState({ username: '', rating: 5, comment: '' });

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/${productId}/reviews`);
            setReviews(response.data);
            calculateAverageRating(response.data);
        } catch (error) {
            console.error('Помилка при завантаженні відгуків', error);
        }
    };

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            setAverageRating(0);
            return;
        }
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating(sum / reviews.length);
    };

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/products/${productId}/reviews`, newReview);
            fetchReviews();
            setNewReview({ username: '', rating: 5, comment: '' });
        } catch (error) {
            console.error('Помилка при додаванні відгуку', error);
        }
    };

    return (
        <div className="review-system">
            <h3>Відгуки</h3>
            <div className="average-rating">
                <p>Середній рейтинг: {averageRating.toFixed(1)}</p>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= averageRating ? 'star filled' : 'star'}>★</span>
                ))}
            </div>
            <form onSubmit={handleSubmitReview}>
                <input
                    type="text"
                    name="username"
                    value={newReview.username}
                    onChange={handleInputChange}
                    placeholder="Ваше ім'я"
                    required
                />
                <select
                    name="rating"
                    value={newReview.rating}
                    onChange={handleInputChange}
                    required
                >
                    <option value="1">1 зірка</option>
                    <option value="2">2 зірки</option>
                    <option value="3">3 зірки</option>
                    <option value="4">4 зірки</option>
                    <option value="5">5 зірок</option>
                </select>
                <textarea
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    placeholder="Ваш відгук"
                    required
                ></textarea>
                <button type="submit">Надіслати відгук</button>
            </form>
            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review">
                        <p><strong>{review.username}</strong></p>
                        <p>Рейтинг: {review.rating}/5</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSystem;
