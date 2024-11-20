const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Product = require('./Product');

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Review.belongsTo(Product);
Product.hasMany(Review);

module.exports = Review;
