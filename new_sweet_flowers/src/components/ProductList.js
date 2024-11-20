import React, { useEffect, useRef } from 'react';
import '../styles/ProductList.scss';

const ProductList = ({ products, onAddToCart, onQuickView }) => {
    const productRefs = useRef([]);

    useEffect(() => {
        productRefs.current = productRefs.current.slice(0, products.length);
    }, [products]);

    useEffect(() => {
        productRefs.current.forEach((ref, index) => {
            if (ref) {
                gsap.from(ref, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    delay: index * 0.1
                });
            }
        });
    }, [products]);

    return (
        <div className="product-list">
            {products.map((product, index) => (
                <div 
                    key={product.id} 
                    className="product-card interactive-3d-card"
                    ref={el => productRefs.current[index] = el}
                >
                    <div className="product-image-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-overlay">
                            <button className="quick-view-btn" onClick={() => onQuickView(product)}>
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
