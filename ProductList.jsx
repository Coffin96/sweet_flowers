import React from 'react';

function ProductList({ products, onAddToCart }) {
    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <h3>{product.name}</h3>
                    <p>Ціна: {product.price} грн</p>
                    <button onClick={() => onAddToCart(product)}>
                        Додати в кошик
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProductList;