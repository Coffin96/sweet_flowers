import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Header.scss';

const Header = ({ isAuthenticated, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">Sweet Flowers</Link>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <nav className={isMenuOpen ? 'open' : ''}>
                        <motion.ul
                            initial={false}
                            animate={isMenuOpen ? "open" : "closed"}
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                }
                            }}
                        >
                            <motion.li variants={{
                                open: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        y: { stiffness: 1000, velocity: -100 }
                                    }
                                },
                                closed: {
                                    y: 50,
                                    opacity: 0,
                                    transition: {
                                        y: { stiffness: 1000 }
                                    }
                                }
                            }}>
                                <Link to="/" onClick={() => setIsMenuOpen(false)}>Головна</Link>
                            </motion.li>
                            <motion.li variants={{
                                open: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        y: { stiffness: 1000, velocity: -100 }
                                    }
                                },
                                closed: {
                                    y: 50,
                                    opacity: 0,
                                    transition: {
                                        y: { stiffness: 1000 }
                                    }
                                }
                            }}>
                                <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Кошик</Link>
                            </motion.li>
                            {isAuthenticated ? (
                                <>
                                    <motion.li variants={{
                                        open: {
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                y: { stiffness: 1000, velocity: -100 }
                                            }
                                        },
                                        closed: {
                                            y: 50,
                                            opacity: 0,
                                            transition: {
                                                y: { stiffness: 1000 }
                                            }
                                        }
                                    }}>
                                        <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Адмін-панель</Link>
                                    </motion.li>
                                    <motion.li variants={{
                                        open: {
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                y: { stiffness: 1000, velocity: -100 }
                                            }
                                        },
                                        closed: {
                                            y: 50,
                                            opacity: 0,
                                            transition: {
                                                y: { stiffness: 1000 }
                                            }
                                        }
                                    }}>
                                        <button onClick={() => { onLogout(); setIsMenuOpen(false); }}>Вийти</button>
                                    </motion.li>
                                </>
                            ) : (
                                <motion.li variants={{
                                    open: {
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            y: { stiffness: 1000, velocity: -100 }
                                        }
                                    },
                                    closed: {
                                        y: 50,
                                        opacity: 0,
                                        transition: {
                                            y: { stiffness: 1000 }
                                        }
                                    }
                                }}>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Увійти</Link>
                                </motion.li>
                            )}
                        </motion.ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
