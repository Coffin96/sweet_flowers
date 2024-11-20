import React from 'react';

function Cart({ items }) {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart">
            <h2>Кошик</h2>
            {items.map((item, index) => (
                <div key={index} className="cart-item">
                    {item.name} - {item.price} грн
                </div>
            ))}
            <p>Загальна сума: {total} грн</p>
        </div>
    );
}

export default Cart;