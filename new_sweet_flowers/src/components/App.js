import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Cart from './Cart';
import Slider from './Slider';
import ReviewSystem from './ReviewSystem';
import OrderForm from './OrderForm';
import AdminPanel from './AdminPanel';
import '../styles/App.scss';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <nav>
                    <ul>
                        <li><Link to="/">Головна</Link></li>
                        <li><Link to="/admin">Адмін-панель</Link></li>
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
                                <ProductList />
                            </section>
                            <section id="cart">
                                <h2>Кошик</h2>
                                <Cart />
                            </section>
                            <section id="order">
                                <h2>Оформлення замовлення</h2>
                                <OrderForm />
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
                    </Route>
                    <Route path="/admin">
                        <AdminPanel />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
