const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const initDatabase = require('./db/init');
const Product = require('./db/models/Product');
const User = require('./db/models/User');

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

// Маршрут для реєстрації
app.post('/api/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
});

// Маршрут для входу
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && await user.validatePassword(password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

// Захищені маршрути для адмін-панелі
app.use('/api/admin', authenticateJWT);

// API маршрути

// Отримати всі продукти
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Отримати продукт за ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

// Створити новий продукт (захищений маршрут)
app.post('/api/admin/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Error creating product' });
    }
});

// Оновити продукт (захищений маршрут)
app.put('/api/admin/products/:id', async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating product' });
    }
});

// Видалити продукт (захищений маршрут)
app.delete('/api/admin/products/:id', async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
