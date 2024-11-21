import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Sweet Flowers</h3>
                    <p>Створюємо неповторні букети з зефіру для особливих моментів.</p>
                </div>
                <div className="footer-section">
                    <h3>Швидкі посилання</h3>
                    <ul>
                        <li><Link to="/">Головна</Link></li>
                        <li><Link to="/products">Букети</Link></li>
                        <li><Link to="/about">Про нас</Link></li>
                        <li><Link to="/contacts">Контакти</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Контакти</h3>
                    <p>Телефон: +380 12 345 6789</p>
                    <p>Email: info@sweetflowers.com</p>
                    <p>Адреса: вул. Квіткова, 123, Київ</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Sweet Flowers. Всі права захищені.</p>
            </div>
        </footer>
    );
};

export default Footer;
