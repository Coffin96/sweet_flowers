import React, { useState, useEffect } from 'react';
import ProductManager from '../utils/ProductManager';
import ReviewManager from '../utils/ReviewManager';
import '../styles/AdminPanel.scss';

const AdminPanel = ({ showToast }) => {
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productManager = new ProductManager();
    const reviewManager = new ReviewManager();

    useEffect(() => {
        fetchProducts();
        fetchAllReviews();
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

    const fetchAllReviews = async () => {
        try {
            const allReviews = await reviewManager.fetchAllReviews();
            setReviews(allReviews);
        } catch (error) {
            showToast('Помилка при завантаженні відгуків', 'error');
        }
    };

    const handleInputChange = (e, isEditing = false, type = 'product') => {
        const { name, value } = e.target;
        if (type === 'product') {
            if (isEditing) {
                setEditingProduct({ ...editingProduct, [name]: value });
            } else {
                setNewProduct({ ...newProduct, [name]: value });
            }
        } else if (type === 'review') {
            setEditingReview({ ...editingReview, [name]: value });
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

    const handleEditReview = async (e) => {
        e.preventDefault();
        try {
            await reviewManager.updateReview(editingReview.id, editingReview);
            setEditingReview(null);
            fetchAllReviews();
            showToast('Відгук успішно оновлено', 'success');
        } catch (error) {
            showToast('Помилка при оновленні відгуку', 'error');
        }
    };

    const handleDeleteReview = async (id) => {
        try {
            await reviewManager.deleteReview(id);
            fetchAllReviews();
            showToast('Відгук успішно видалено', 'success');
        } catch (error) {
            showToast('Помилка при видаленні відгуку', 'error');
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="admin-panel">
            <h2>Адмін-панель</h2>
            {/* Product management section */}
            <section className="product-management">
                <h3>Управління продуктами</h3>
                {/* Product form and list (existing code) */}
            </section>
            
            {/* Review management section */}
            <section className="review-management">
                <h3>Управління відгуками</h3>
                <div className="reviews-list">
                    {reviews.map(review => (
                        <div key={review.id} className="review-item">
                            {editingReview && editingReview.id === review.id ? (
                                <form onSubmit={handleEditReview}>
                                    <input
                                        type="text"
                                        name="author"
                                        value={editingReview.author}
                                        onChange={(e) => handleInputChange(e, true, 'review')}
                                        required
                                    />
                                    <select
                                        name="rating"
                                        value={editingReview.rating}
                                        onChange={(e) => handleInputChange(e, true, 'review')}
                                        required
                                    >
                                        <option value="1">1 зірка</option>
                                        <option value="2">2 зірки</option>
                                        <option value="3">3 зірки</option>
                                        <option value="4">4 зірки</option>
                                        <option value="5">5 зірок</option>
                                    </select>
                                    <textarea
                                        name="comment"
                                        value={editingReview.comment}
                                        onChange={(e) => handleInputChange(e, true, 'review')}
                                        required
                                    ></textarea>
                                    <button type="submit">Зберегти</button>
                                    <button type="button" onClick={() => setEditingReview(null)}>Скасувати</button>
                                </form>
                            ) : (
                                <>
                                    <p><strong>Автор:</strong> {review.author}</p>
                                    <p><strong>Рейтинг:</strong> {review.rating}</p>
                                    <p><strong>Коментар:</strong> {review.comment}</p>
                                    <button onClick={() => setEditingReview(review)}>Редагувати</button>
                                    <button onClick={() => handleDeleteReview(review.id)}>Видалити</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminPanel;
