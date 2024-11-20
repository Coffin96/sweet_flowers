import React, { useState } from 'react';
import '../styles/OrderForm.scss';

const OrderForm = ({ cart }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Тут би ми відправляли дані замовлення на сервер
        console.log('Замовлення відправлено:', { ...formData, cart });
        // Очистити форму після відправки
        setFormData({ name: '', email: '', phone: '', address: '' });
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="order-form">
            <h3>Оформлення замовлення</h3>
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
