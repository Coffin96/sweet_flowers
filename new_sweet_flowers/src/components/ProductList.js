import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ProductList.scss';

const ProductList = ({ products, onAddToCart, onQuickView }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    className="product-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="product-image-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-overlay">
                            <button className="quick-view-btn" onClick={() => onQuickView(product.id)}>
                                Швидкий перегляд
                            </button>
                        </div>
                    </div>
                    <h3>{product.name}</h3>
                    <p className="price">{product.price} грн</p>
                    <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                        Додати до кошика
                    </button>
                </motion.div>
            ))}
        </div>
    );
};

export default ProductList;
