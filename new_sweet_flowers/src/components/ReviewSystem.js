import React, { useState, useEffect } from 'react';
import '../styles/ReviewSystem.scss';

const ReviewSystem = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        // Тут ми б зазвичай робили запит до API для отримання відгуків
        // Для прикладу, використаємо моковані дані
        const mockReviews = [
            { id: 1, username: 'Анна', rating: 5, comment: 'Чудовий букет!' },
            { id: 2, username: 'Петро', rating: 4, comment: 'Дуже гарний, але трохи запізнилися з доставкою.' },
        ];
        setReviews(mockReviews);
        setAverageRating(mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length);
    }, [productId]);

    const handleSubmitReview = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newReview = {
            id: reviews.length + 1,
            username: formData.get('username'),
            rating: parseInt(formData.get('rating')),
            comment: formData.get('comment')
        };
        setReviews([...reviews, newReview]);
        // Тут би ми відправляли новий відгук на сервер
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
                <input type="text" name="username" placeholder="Ваше ім'я" required />
                <select name="rating" required>
                    <option value="">Оберіть рейтинг</option>
                    <option value="1">1 зірка</option>
                    <option value="2">2 зірки</option>
                    <option value="3">3 зірки</option>
                    <option value="4">4 зірки</option>
                    <option value="5">5 зірок</option>
                </select>
                <textarea name="comment" placeholder="Ваш відгук" required></textarea>
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
