const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending'
  }
});

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

module.exports = { Order, OrderItem };
