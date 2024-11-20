import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Імітація завантаження продуктів
        const mockProducts = [
            { id: 1, name: 'Продукт 1', price: 100 },
            { id: 2, name: 'Продукт 2', price: 200 }
        ];
        setProducts(mockProducts);
    }, []);

    const handleAddToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    return (
        <div className="app-container">
            <h1>Інтерактивний Інтернет-магазин</h1>
            <div className="content">
                <ProductList 
                    products={products} 
                    onAddToCart={handleAddToCart} 
                />
                <Cart items={cart} />
            </div>
        </div>
    );
}

export default App;