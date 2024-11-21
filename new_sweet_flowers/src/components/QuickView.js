import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/QuickView.scss';

const QuickView = ({ product, onClose, onAddToCart }) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="quick-view-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="quick-view-content"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={onClose}>&times;</button>
                    <div className="product-details">
                        <img src={product.imageUrl} alt={product.name} />
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p className="price">{product.price} грн</p>
                            <p className="description">{product.description}</p>
                            <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                                Додати до кошика
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuickView;
