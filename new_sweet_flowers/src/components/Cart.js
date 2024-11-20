import React from 'react';
import '../styles/Cart.scss';

function Cart({ items }) {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart">
            <h3>Кошик</h3>
            {items.length === 0 ? (
                <p>Ваш кошик порожній</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.price} грн
                            </li>
                        ))}
                    </ul>
                    <p className="total">Загальна сума: {total} грн</p>
                    <button className="checkout-button">Оформити замовлення</button>
                </>
            )}
        </div>
    );
}

export default Cart;
