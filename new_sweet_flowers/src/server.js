const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const initDatabase = require('./db/init');
const Product = require('./db/models/Product');
const User = require('./db/models/User');
const { Order, OrderItem } = require('./db/models/Order');

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

// API маршрути для замовлень

// Створити нове замовлення
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, items } = req.body;
        
        const order = await Order.create({
            customerName,
            customerEmail,
            customerPhone,
            totalAmount: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        });

        for (const item of items) {
            await OrderItem.create({
                OrderId: order.id,
                ProductId: item.productId,
                quantity: item.quantity,
                price: item.price
            });
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order', error);
        res.status(400).json({ error: 'Error creating order' });
    }
});

// Отримати всі замовлення (тільки для адміністратора)
app.get('/api/admin/orders', authenticateJWT, async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: OrderItem, include: [Product] }]
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders', error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Оновити статус замовлення (тільки для адміністратора)
app.put('/api/admin/orders/:id', authenticateJWT, async (req, res) => {
    try {
        const { status } = req.body;
        const [updated] = await Order.update({ status }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrder = await Order.findByPk(req.params.id);
            res.json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order', error);
        res.status(400).json({ error: 'Error updating order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
