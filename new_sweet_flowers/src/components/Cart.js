import React from 'react';
import '../styles/Cart.scss';

const Cart = ({ items }) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart">
            <h3>Кошик</h3>
            {items.length === 0 ? (
                <p>Ваш кошик порожній</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p>{item.price} грн</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <strong>Загальна сума:</strong>
                        <strong>{totalPrice} грн</strong>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
