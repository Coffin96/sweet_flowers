const sequelize = require('./database');
const Product = require('./models/Product');

async function initDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('База даних успішно синхронізована');

    // Додамо кілька тестових продуктів
    await Product.bulkCreate([
      { name: 'Букет "Рожева мрія"', price: 500, description: 'Ніжний букет з рожевих зефірних квітів', imageUrl: '/images/bouquet1.jpg' },
      { name: 'Букет "Ніжність"', price: 450, description: 'Елегантний букет з білих та рожевих зефірних квітів', imageUrl: '/images/bouquet2.jpg' },
      { name: 'Букет "Святковий"', price: 600, description: 'Яскравий букет з різнокольорових зефірних квітів', imageUrl: '/images/bouquet3.jpg' },
    ]);
    console.log('Тестові продукти додано');
  } catch (error) {
    console.error('Помилка при ініціалізації бази даних:', error);
  }
}

module.exports = initDatabase;
