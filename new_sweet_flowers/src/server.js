const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const initDatabase = require('./db/init');
const Product = require('./db/models/Product');
const User = require('./db/models/User');
const { Order, OrderItem } = require('./db/models/Order');
const Review = require('./db/models/Review');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'your_jwt_secret'; // В реальному проекті це має бути в змінних середовища

app.use(cors());
app.use(express.json());

// Ініціалізуємо базу даних
initDatabase();

// Middleware для перевірки JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// ... (попередній код залишається без змін)

// Оновлені API маршрути для відгуків

// Отримати відгуки для продукту
app.get('/api/products/:productId/reviews', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { ProductId: req.params.productId },
            order: [['createdAt', 'DESC']]
        });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews', error);
        res.status(500).json({ error: 'Error fetching reviews' });
    }
});

// Додати новий відгук
app.post('/api/products/:productId/reviews', async (req, res) => {
    try {
        const { rating, comment, author } = req.body;
        const review = await Review.create({
            rating,
            comment,
            author,
            ProductId: req.params.productId
        });
        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review', error);
        res.status(400).json({ error: 'Error creating review' });
    }
});

// Редагувати відгук (тільки для адміністратора)
app.put('/api/admin/reviews/:reviewId', authenticateJWT, async (req, res) => {
    try {
        const { rating, comment, author } = req.body;
        const [updated] = await Review.update(
            { rating, comment, author },
            { where: { id: req.params.reviewId } }
        );
        if (updated) {
            const updatedReview = await Review.findByPk(req.params.reviewId);
            res.json(updatedReview);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error updating review', error);
        res.status(400).json({ error: 'Error updating review' });
    }
});

// Видалити відгук (тільки для адміністратора)
app.delete('/api/admin/reviews/:reviewId', authenticateJWT, async (req, res) => {
    try {
        const deleted = await Review.destroy({
            where: { id: req.params.reviewId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error deleting review', error);
        res.status(500).json({ error: 'Error deleting review' });
    }
});

// ... (попередній код залишається без змін)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
