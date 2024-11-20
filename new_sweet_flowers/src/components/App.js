import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Cart from './Cart';
import Slider from './Slider';
import ReviewSystem from './ReviewSystem';
import OrderForm from './OrderForm';
import ProductManager from '../utils/ProductManager';
import '../styles/App.scss';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const productManager = new ProductManager();
        productManager.fetchProducts().then(setProducts);
    }, []);

    const handleAddToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    const handleQuickView = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="app-container">
            <Header />
            <main>
                <Slider />
                <section id="about">
                    <h2>Про нас</h2>
                    <p>Sweet Flowers - це унікальний магазин, де ми створюємо неповторні букети з зефіру. Наші букети - це ідеальний подарунок для тих, хто цінує оригінальність та солодкі сюрпризи.</p>
                </section>
                <section id="products">
                    <h2>Наші букети</h2>
                    <ProductList 
                        products={products} 
                        onAddToCart={handleAddToCart}
                        onQuickView={handleQuickView}
                    />
                </section>
                <section id="cart">
                    <h2>Кошик</h2>
                    <Cart items={cart} />
                </section>
                {selectedProduct && (
                    <section id="product-details">
                        <h2>{selectedProduct.name}</h2>
                        <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
                        <p>{selectedProduct.description}</p>
                        <p>Ціна: {selectedProduct.price} грн</p>
                        <ReviewSystem productId={selectedProduct.id} />
                    </section>
                )}
                <section id="order">
                    <h2>Оформлення замовлення</h2>
                    <OrderForm cart={cart} />
                </section>
                <section id="contacts">
                    <h2>Зв'яжіться з нами</h2>
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <p>+380 12 345 6789</p>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <p>info@sweetflowers.com</p>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <p>вул. Квіткова, 123, Київ</p>
                        </div>
                    </div>
                    <form id="contact-form">
                        <input type="text" name="name" placeholder="Ваше ім'я" required />
                        <input type="email" name="email" placeholder="Ваш email" required />
                        <textarea name="message" placeholder="Ваше повідомлення" required></textarea>
                        <button type="submit">Надіслати</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
