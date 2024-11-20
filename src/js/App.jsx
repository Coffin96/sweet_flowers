import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Імітація завантаження продуктів
        const mockProducts = [
            { id: 1, name: 'Букет "Рожева мрія"', price: 500, image: 'path_to_image_1.jpg' },
            { id: 2, name: 'Букет "Ніжність"', price: 450, image: 'path_to_image_2.jpg' },
            { id: 3, name: 'Букет "Святковий"', price: 600, image: 'path_to_image_3.jpg' },
        ];
        setProducts(mockProducts);
    }, []);

    const handleAddToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    return (
        <div className="app-container">
            <header>
                <nav>
                    <div className="logo">Sweet Flowers</div>
                    <ul>
                        <li><a href="#home">Головна</a></li>
                        <li><a href="#about">Про нас</a></li>
                        <li><a href="#products">Продукція</a></li>
                        <li><a href="#contacts">Контакти</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="home">
                    <h1>Sweet Flowers</h1>
                    <p className="slogan">Солодкі букети для особливих моментів</p>
                    <a href="#products" className="cta-button">Замовити букет</a>
                </section>

                <section id="about">
                    <h2>Про нас</h2>
                    <p>Sweet Flowers - це унікальний магазин, де ми створюємо неповторні букети з зефіру. Наші букети - це ідеальний подарунок для тих, хто цінує оригінальність та солодкі сюрпризи.</p>
                </section>

                <section id="products">
                    <h2>Наші букети</h2>
                    <ProductList 
                        products={products} 
                        onAddToCart={handleAddToCart} 
                    />
                </section>

                <section id="cart">
                    <h2>Кошик</h2>
                    <Cart items={cart} />
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

            <footer>
                <p>&copy; 2023 Sweet Flowers. Всі права захищені.</p>
            </footer>
        </div>
    );
}

export default App;
