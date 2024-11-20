import React, { useState } from 'react';
import axios from 'axios';
import '../styles/OrderForm.scss';

const API_URL = 'https://api.example.com'; // Замініть на URL вашого API

const OrderForm = ({ cart }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [orderStatus, setOrderStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/orders`, {
                ...formData,
                items: cart.map(item => ({ id: item.id, quantity: 1 })),
                totalPrice: cart.reduce((sum, item) => sum + item.price, 0)
            });
            setOrderStatus('success');
            setFormData({ name: '', email: '', phone: '', address: '' });
        } catch (error) {
            console.error('Помилка при оформленні замовлення', error);
            setOrderStatus('error');
        }
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="order-form">
            <h3>Оформлення замовлення</h3>
            {orderStatus === 'success' && (
                <div className="order-success">Ваше замовлення успішно оформлено!</div>
            )}
            {orderStatus === 'error' && (
                <div className="order-error">Виникла помилка при оформленні замовлення. Спробуйте ще раз.</div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше ім'я"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ваш email"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ваш телефон"
                    required
                />
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Адреса доставки"
                    required
                ></textarea>
                <div className="order-summary">
                    <h4>Ваше замовлення:</h4>
                    {cart.map((item, index) => (
                        <div key={index} className="order-item">
                            <span>{item.name}</span>
                            <span>{item.price} грн</span>
                        </div>
                    ))}
                    <div className="order-total">
                        <strong>Загальна сума:</strong>
                        <strong>{totalPrice} грн</strong>
                    </div>
                </div>
                <button type="submit">Оформити замовлення</button>
            </form>
        </div>
    );
};

export default OrderForm;
