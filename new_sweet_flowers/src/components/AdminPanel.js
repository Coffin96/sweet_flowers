import React, { useState, useEffect } from 'react';
import ProductManager from '../utils/ProductManager';
import '../styles/AdminPanel.scss';

const AdminPanel = ({ showToast }) => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [editingProduct, setEditingProduct] = useState(null);
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
            showToast('Помилка при завантаженні продуктів', 'error');
        }
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingProduct({ ...editingProduct, [name]: value });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await productManager.createProduct(newProduct);
            setNewProduct({ name: '', price: '', description: '', imageUrl: '' });
            fetchProducts();
            showToast('Продукт успішно додано', 'success');
        } catch (error) {
            showToast('Помилка при додаванні продукту', 'error');
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            await productManager.updateProduct(editingProduct.id, editingProduct);
            setEditingProduct(null);
            fetchProducts();
            showToast('Продукт успішно оновлено', 'success');
        } catch (error) {
            showToast('Помилка при оновленні продукту', 'error');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await productManager.deleteProduct(id);
            fetchProducts();
            showToast('Продукт успішно видалено', 'success');
        } catch (error) {
            showToast('Помилка при видаленні продукту', 'error');
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="admin-panel">
            <h2>Адмін-панель</h2>
            <form onSubmit={handleAddProduct}>
                <h3>Додати новий продукт</h3>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Назва продукту"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Ціна"
                    required
                />
                <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Опис"
                    required
                ></textarea>
                <input
                    type="text"
                    name="imageUrl"
                    value={newProduct.imageUrl}
                    onChange={handleInputChange}
                    placeholder="URL зображення"
                    required
                />
                <button type="submit">Додати продукт</button>
            </form>
            <div className="product-list">
                <h3>Список продуктів</h3>
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        {editingProduct && editingProduct.id === product.id ? (
                            <form onSubmit={handleEditProduct}>
                                <input
                                    type="text"
                                    name="name"
                                    value={editingProduct.name}
                                    onChange={(e) => handleInputChange(e, true)}
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={editingProduct.price}
                                    onChange={(e) => handleInputChange(e, true)}
                                    required
                                />
                                <textarea
                                    name="description"
                                    value={editingProduct.description}
                                    onChange={(e) => handleInputChange(e, true)}
                                    required
                                ></textarea>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={editingProduct.imageUrl}
                                    onChange={(e) => handleInputChange(e, true)}
                                    required
                                />
                                <button type="submit">Зберегти</button>
                                <button type="button" onClick={() => setEditingProduct(null)}>Скасувати</button>
                            </form>
                        ) : (
                            <>
                                <h4>{product.name}</h4>
                                <p>Ціна: {product.price} грн</p>
                                <p>{product.description}</p>
                                <img src={product.imageUrl} alt={product.name} />
                                <button onClick={() => setEditingProduct(product)}>Редагувати</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Видалити</button>
                            </>
                        )}
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

export default AdminPanel;
