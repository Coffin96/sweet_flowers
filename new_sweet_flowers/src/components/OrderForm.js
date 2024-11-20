import React, { useState } from 'react';
import axios from 'axios';
import '../styles/OrderForm.scss';

const OrderForm = ({ cart, onOrderComplete, showToast }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                ...formData,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: 1,
                    price: item.price
                }))
            };
            const response = await axios.post('http://localhost:3001/api/orders', orderData);
            console.log('Order created:', response.data);
            onOrderComplete();
            showToast('Замовлення успішно оформлено', 'success');
        } catch (error) {
            console.error('Error creating order:', error);
            showToast('Помилка при оформленні замовлення', 'error');
        }
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="order-form">
            <h2>Оформлення замовлення</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Ваше ім'я"
                    required
                />
                <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="Ваш email"
                    required
                />
                <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="Ваш телефон"
                    required
                />
                <div className="order-summary">
                    <h3>Ваше замовлення:</h3>
                    {cart.map(item => (
                        <div key={item.id} className="order-item">
                            <span>{item.name}</span>
                            <span>{item.price} грн</span>
                        </div>
                    ))}
                    <div className="order-total">
                        <strong>Загальна сума:</strong>
                        <strong>{totalAmount} грн</strong>
                    </div>
                </div>
                <button type="submit">Оформити замовлення</button>
            </form>
        </div>
    );
};

export default OrderForm;
