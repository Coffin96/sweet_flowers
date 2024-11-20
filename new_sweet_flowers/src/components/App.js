import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Cart from './Cart';
import Slider from './Slider';
import ReviewSystem from './ReviewSystem';
import OrderForm from './OrderForm';
import AdminPanel from './AdminPanel';
import Login from './Login';
import Toast from './Toast';
import ProductManager from '../utils/ProductManager';
import '../styles/App.scss';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [toast, setToast] = useState(null);
    const productManager = new ProductManager();

    useEffect(() => {
        fetchProducts();
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await productManager.fetchProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            showToast('Помилка при завантаженні продуктів', 'error');
        }
    };

    const handleAddToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
        showToast('Товар додано до кошика', 'success');
    };

    const handleQuickView = async (productId) => {
        try {
            const product = await productManager.getProductById(productId);
            setSelectedProduct(product);
        } catch (error) {
            showToast('Помилка при завантаженні деталей продукту', 'error');
        }
    };

    const handleOrderComplete = () => {
        setOrderCompleted(true);
        setCart([]);
        showToast('Замовлення успішно оформлено', 'success');
    };

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    return (
        <Router>
            <div className="app-container">
                <Header />
                <nav>
                    <ul>
                        <li><Link to="/">Головна</Link></li>
                        <li><Link to="/admin">Адмін-панель</Link></li>
                        {!isAuthenticated && <li><Link to="/login">Вхід</Link></li>}
                        {isAuthenticated && <li><button onClick={() => {
                            localStorage.removeItem('token');
                            setIsAuthenticated(false);
                            showToast('Ви вийшли з системи', 'info');
                        }}>Вихід</button></li>}
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/">
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
                            {cart.length > 0 && !orderCompleted && (
                                <section id="order">
                                    <OrderForm cart={cart} onOrderComplete={handleOrderComplete} />
                                </section>
                            )}
                            {orderCompleted && (
                                <section id="order-completed">
                                    <h2>Дякуємо за ваше замовлення!</h2>
                                    <p>Ми зв'яжемося з вами найближчим часом для підтвердження замовлення.</p>
                                </section>
                            )}
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
                    </Route>
                    <Route path="/admin">
                        {isAuthenticated ? <AdminPanel /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        <Login setIsAuthenticated={setIsAuthenticated} showToast={showToast} />
                    </Route>
                </Switch>
                <Footer />
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;
