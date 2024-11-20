import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.scss';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
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
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/admin/products', newProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewProduct({ name: '', price: '', description: '', imageUrl: '' });
            fetchProducts();
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3001/api/admin/products/${editingProduct.id}`, editingProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error editing product', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product', error);
        }
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
        </div>
    );
};

export default AdminPanel;
