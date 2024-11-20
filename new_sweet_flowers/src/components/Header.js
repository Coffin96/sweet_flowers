import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';

const Header = ({ isAuthenticated, onLogout }) => {
    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <Link to="/">Sweet Flowers</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Головна</Link></li>
                        <li><Link to="/products">Букети</Link></li>
                        <li><Link to="/about">Про нас</Link></li>
                        <li><Link to="/contacts">Контакти</Link></li>
                        {isAuthenticated ? (
                            <>
                                <li><Link to="/admin">Адмін-панель</Link></li>
                                <li><button onClick={onLogout}>Вийти</button></li>
                            </>
                        ) : (
                            <li><Link to="/login">Увійти</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
