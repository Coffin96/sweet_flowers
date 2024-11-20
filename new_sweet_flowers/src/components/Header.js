import React from 'react';
import '../styles/Header.scss';

function Header() {
    return (
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
    );
}

export default Header;
