import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Cart.scss';

const Cart = ({ items }) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart">
            <h2>Кошик</h2>
            {items.length === 0 ? (
                <p>Ваш кошик порожній</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="price">{item.price} грн</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p className="total">Загальна сума: {totalPrice} грн</p>
                        <Link to="/order" className="checkout-button">
                            Оформити замовлення
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
