import React, { useState, useEffect } from 'react';
import ProductManager from '../utils/ProductManager';
import '../styles/ProductList.scss';

const ProductList = ({ onAddToCart, onQuickView }) => {
    const [products, setProducts] = useState([]);
    const productManager = new ProductManager();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const fetchedProducts = await productManager.fetchProducts();
        setProducts(fetchedProducts);
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-overlay">
                            <button className="quick-view-btn" onClick={() => onQuickView(product.id)}>
                                Швидкий перегляд
                            </button>
                        </div>
                    </div>
                    <h3>{product.name}</h3>
                    <p className="price">{product.price} грн</p>
                    <button onClick={() => onAddToCart(product)}>Додати до кошика</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
