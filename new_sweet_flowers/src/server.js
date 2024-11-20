const express = require('express');
const cors = require('cors');
const initDatabase = require('./db/init');
const Product = require('./db/models/Product');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ініціалізуємо базу даних
initDatabase();

// API маршрути

// Отримати всі продукти
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні продуктів' });
  }
});

// Отримати продукт за ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Продукт не знайдено' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні продукту' });
  }
});

// Створити новий продукт
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Помилка при створенні продукту' });
  }
});

// Оновити продукт
app.put('/api/products/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Продукт не знайдено' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Помилка при оновленні продукту' });
  }
});

// Видалити продукт
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Продукт не знайдено' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Помилка при видаленні продукту' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
