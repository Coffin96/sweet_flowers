class ProductManager {
    constructor() {
        this.products = [];
        this.cart = [];
        this.initEventListeners();
    }

    async fetchProducts() {
        try {
            const response = await fetch('/api/products');
            this.products = await response.json();
            this.renderProducts();
        } catch (error) {
            console.error('Помилка завантаження продуктів:', error);
        }
    }

    renderProducts() {
        const catalogContainer = document.querySelector('.product-grid');
        catalogContainer.innerHTML = '';

        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            catalogContainer.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card', 'interactive-3d-card');
        
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <div class="product-overlay">
                    <button class="quick-view-btn" data-id="${product.id}">
                        Швидкий перегляд
                    </button>
                </div>
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-container">
                    <span class="product-price">${product.price} грн</span>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="cart-icon">🛒</i>
                    </button>
                </div>
            </div>
        `;

        // 3D hover ефект
        this.apply3DEffect(card);

        // Інтерактивні обробники подій
        this.setupCardInteractions(card);

        return card;
    }

    apply3DEffect(card) {
        card.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY } = e;
            const { width, height } = card.getBoundingClientRect();

            const rotateX = ((offsetY - height / 2) / height) * 15;
            const rotateY = -((offsetX - width / 2) / width) * 15;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                ease: 'power1.out',
                duration: 0.5
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: 'power1.out',
                duration: 0.5
            });
        });
    }

    setupCardInteractions(card) {
        const quickViewBtn = card.querySelector('.quick-view-btn');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');

        quickViewBtn.addEventListener('click', () => this.showQuickView(card));
        addToCartBtn.addEventListener('click', () => this.addToCart(card));
    }

    showQuickView(card) {
        const productId = card.querySelector('.quick-view-btn').dataset.id;
        const product = this.products.find(p => p.id === productId);

        // Створення модального вікна
        const modal = document.createElement('div');
        modal.classList.add('quick-view-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-product-details">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <div class="modal-info">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <div class="modal-price">${product.price} грн</div>
                        <button class="add-to-cart-modal-btn">Додати до кошика</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Анімація модального вікна
        gsap.fromTo(modal, 
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );

        // Закриття модального вікна
        modal.querySelector('.close-modal').addEventListener('click', () => {
            gsap.to(modal, {
                opacity: 0,
                scale: 0.7,
                duration: 0.3,
                onComplete: () => modal.remove()
            });
        });
    }

    addToCart(card) {
        const productId = card.querySelector('.add-to-cart-btn').dataset.id;
        const product = this.products.find(p => p.id === productId);

        this.cart.push(product);
        this.updateCartUI();

        // Анімація додавання в кошик
        gsap.fromTo(card.querySelector('.add-to-cart-btn'), 
            { scale: 1 }, 
            { scale: 1.2, repeat: 1, yoyo: true, duration: 0.2 }
        );
    }

    updateCartUI() {
        const cartCounter = document.querySelector('.cart-counter');
        cartCounter.textContent = this.cart.length;

        // Додаткова анімація лічильника
        gsap.fromTo(cartCounter, 
            { scale: 1 }, 
            { scale: 1.5, repeat: 1, yoyo: true, duration: 0.2 }
        );
    }

    initEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.fetchProducts();
        });
    }
}

// Ініціалізація менеджера продуктів
const productManager = new ProductManager();