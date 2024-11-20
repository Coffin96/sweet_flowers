import React from 'react';
import '../styles/ProductList.scss';

function ProductList({ products, onAddToCart }) {
    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price">{product.price} грн</p>
                    <button onClick={() => onAddToCart(product)}>Додати до кошика</button>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
