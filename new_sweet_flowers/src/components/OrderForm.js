import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/OrderForm.scss';

const OrderForm = ({ cart, onOrderComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Тут буде логіка відправки замовлення на сервер
        console.log('Замовлення відправлено:', { ...formData, cart, totalPrice });
        onOrderComplete();
    };

    return (
        <div className="order-form">
            <h2>Оформлення замовлення</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Ім'я:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Телефон:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Адреса доставки:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="order-summary">
                    <h3>Ваше замовлення:</h3>
                    <ul>
                        {cart.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span>{item.name}</span>
                                <span>{item.price} грн</span>
                            </motion.li>
                        ))}
                    </ul>
                    <p className="total">Загальна сума: {totalPrice} грн</p>
                </div>
                <button type="submit" className="submit-button">Підтвердити замовлення</button>
            </form>
        </div>
    );
};

export default OrderForm;
