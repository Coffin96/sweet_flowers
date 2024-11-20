import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReviewSystem.scss';

const ReviewSystem = ({ productId, showToast }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', author: '' });

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/products/${productId}/reviews`);
            setReviews(response.data);
        } catch (error) {
            showToast('Помилка при завантаженні відгуків', 'error');
        }
    };

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/api/products/${productId}/reviews`, newReview);
            setNewReview({ rating: 5, comment: '', author: '' });
            fetchReviews();
            showToast('Відгук успішно додано', 'success');
        } catch (error) {
            showToast('Помилка при додаванні відгуку', 'error');
        }
    };

    return (
        <div className="review-system">
            <h3>Відгуки</h3>
            <form onSubmit={handleSubmit}>
                <select name="rating" value={newReview.rating} onChange={handleInputChange}>
                    <option value="1">1 зірка</option>
                    <option value="2">2 зірки</option>
                    <option value="3">3 зірки</option>
                    <option value="4">4 зірки</option>
                    <option value="5">5 зірок</option>
                </select>
                <input
                    type="text"
                    name="author"
                    value={newReview.author}
                    onChange={handleInputChange}
                    placeholder="Ваше ім'я"
                    required
                />
                <textarea
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    placeholder="Ваш відгук"
                    required
                ></textarea>
                <button type="submit">Додати відгук</button>
            </form>
            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review">
                        <div className="review-header">
                            <span className="author">{review.author}</span>
                            <span className="rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                        </div>
                        <p className="comment">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSystem;
