import React, { useState, useEffect } from 'react';
import ProductManager from '../js/ProductManager';
import OrderSystem from '../js/OrderSystem';
import CartManager from '../js/CartManager';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const productManager = new ProductManager();
        const cartManager = new CartManager();

        // Ініціалізація менеджерів
        productManager.fetchProducts()
            .then(fetchedProducts => setProducts(fetchedProducts));
    }, []);

    const handleAddToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
    };

    return (
        <div className="app-container">
            <ProductList 
                products={products} 
                onAddToCart={handleAddToCart} 
            />
            <Cart items={cart} />
            <OrderForm cart={cart} />
        </div>
    );
}

export default App;