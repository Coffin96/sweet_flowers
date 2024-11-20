import React, { useState, useEffect } from 'react';
import ProductManager from '../utils/ProductManager';
import '../styles/ProductList.scss';

const ProductList = ({ onAddToCart, onQuickView }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productManager = new ProductManager();

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await productManager.fetchProducts(currentPage);
            setProducts(response.products);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="product-list-container">
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-wrapper">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <div className="product-overlay">
                                <button className="quick-view-btn" onClick={() => onQuickView(product.id)}>
                                    Швидкий перегляд
                                </button>
                            </div>
                        </div>
                        <h3>{product.name}</h3>
                        <p className="price">{product.price} грн</p>
                        <button onClick={() => onAddToCart(product)}>Додати до кошика</button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
