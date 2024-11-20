class ReviewRatingSystem {
    constructor(productId) {
        this.productId = productId;
        this.reviews = this.getReviewsFromLocalStorage();
        this.initReviewSystem();
    }

    initReviewSystem() {
        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('review-section');
        reviewContainer.innerHTML = `
            <h3>Відгуки</h3>
            <div class="rating-container">
                <div class="star-rating">
                    ${this.generateStarRating()}
                </div>
                <p>Середній рейтинг: <span id="average-rating">4.5</span></p>
            </div>

            <form id="review-form">
                <input type="text" name="username" placeholder="Ваше ім'я" required>
                <select name="rating" required>
                    <option value="">Оберіть рейтинг</option>
                    <option value="1">1 зірка</option>
                    <option value="2">2 зірки</option>
                    <option value="3">3 зірки</option>
                    <option value="4">4 зірки</option>
                    <option value="5">5 зірок</option>
                </select>
                <textarea name="comment" placeholder="Ваш відгук"></textarea <button type="submit">Надіслати відгук</button>
            </form>
            <div id="reviews-list"></div>
        `;

        document.querySelector(`.product-details[data-id="${this.productId}"]`).appendChild(reviewContainer);
        this.renderReviews();
        this.attachReviewListeners();
    }

    generateStarRating() {
        return Array.from({ length: 5 }, (_, index) => `
            <span class="star" data-value="${index + 1}">★</span>
        `).join('');
    }

    attachReviewListeners() {
        const reviewForm = document.getElementById('review-form');
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview(new FormData(reviewForm));
        });
    }

    submitReview(formData) {
        const review = {
            username: formData.get('username'),
            rating: parseInt(formData.get('rating')),
            comment: formData.get('comment'),
            productId: this.productId
        };

        this.reviews.push(review);
        this.saveReviewsToLocalStorage();
        this.renderReviews();
    }

    renderReviews() {
        const reviewsList = document.getElementById('reviews-list');
        reviewsList.innerHTML = '';

        this.reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <strong>${review.username}</strong> (${review.rating} зірок)
                <p>${review.comment}</p>
            `;
            reviewsList.appendChild(reviewItem);
        });

        this.updateAverageRating();
    }

    updateAverageRating() {
        const averageRatingElement = document.getElementById('average-rating');
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / this.reviews.length) || 0;
        averageRatingElement.textContent = averageRating.toFixed(1);
    }

    getReviewsFromLocalStorage() {
        return JSON.parse(localStorage.getItem(`reviews-${this.productId}`) || '[]');
    }

    saveReviewsToLocalStorage() {
        localStorage.setItem(`reviews-${this.productId}`, JSON.stringify(this.reviews));
    }
}