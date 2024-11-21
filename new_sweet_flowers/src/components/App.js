import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Cart from './Cart';
import QuickView from './QuickView';
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

    const handleQuickView = (productId) => {
        const product = products.find(p => p.id === productId);
        setSelectedProduct(product);
    };

    const handleCloseQuickView = () => {
        setSelectedProduct(null);
    };

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        showToast('Ви вийшли з системи', 'info');
    };

    return (
        <Router>
            <div className="app-container">
                <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <ProductList 
                                products={products}
                                onAddToCart={handleAddToCart}
                                onQuickView={handleQuickView}
                            />
                        </Route>
                        <Route path="/cart">
                            <Cart items={cart} />
                        </Route>
                        <Route path="/order">
                            <OrderForm cart={cart} />
                        </Route>
                        <Route path="/admin">
                            {isAuthenticated ? <AdminPanel /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                        </Route>
                    </Switch>
                </main>
                <Footer />
                {selectedProduct && (
                    <QuickView
                        product={selectedProduct}
                        onClose={handleCloseQuickView}
                        onAddToCart={handleAddToCart}
                    />
                )}
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
