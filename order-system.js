class OrderSystem {
    constructor() {
        this.cart = this.getCartFromLocalStorage();
        this.initOrderForm();
    }

    initOrderForm() {
        const orderForm = document.createElement('div');
        orderForm.classList.add('order-form');
        orderForm.innerHTML = `
            <h2>Оформлення замовлення</h2>
            <form id="order-form">
                <input type="text" name="name" placeholder="Ваше ім'я" required>
                <input type="tel" name="phone" placeholder="Телефон" required>
                <input type="email" name="email" placeholder="Email" required>
                <textarea name="address" placeholder="Адреса доставки"></textarea>
                
                <div class="cart-summary">
                    <h3>Кошик</h3>
                    <ul id="cart-items"></ul>
                    <p>Загальна сума: <span id="total-price">0 грн</span></p>
                </div>

                <button type="submit">Надіслати замовлення</button>
            </form>
        `;

        document.querySelector('.container').appendChild(orderForm);
        this.updateCartDisplay();
        this.attachOrderFormListeners();
    }

    attachOrderFormListeners() {
        const orderForm = document.getElementById('order-form');
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrder(e.target);
        });
    }

    processOrder(formData) {
        const formValues = new FormData(formData);
        const orderDetails = {
            customer: {
                name: formValues.get('name'),
                phone: formValues.get('phone'),
                email: formValues.get('email'),
                address: formValues.get('address')
            },
            items: this.cart,
            totalPrice: this.calculateTotalPrice()
        };

        this.sendOrderEmail(orderDetails);
        this.clearCart();
    }

    sendOrderEmail(orderDetails) {
        // Серверна логіка надсилання листа
        fetch('/api/send-order', {
            method: 'POST',
            body: JSON.stringify(orderDetails)
        }).then(response => {
            alert('Замовлення успішно надіслано!');
        });
    }

    calculateTotalPrice() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }

    updateCartDisplay() {
        const cartItemsList = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        cartItemsList.innerHTML = '';
        this.cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} грн`;
            cartItemsList.appendChild(li);
        });

        totalPriceElement.textContent = `${this.calculateTotalPrice()} грн`;
    }

    getCartFromLocalStorage() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }

    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    addToCart(product) {
        this.cart.push(product);
        this.saveCartToLocalStorage();
        this.updateCartDisplay();
    }

    clearCart() {
        this.cart = [];
        localStorage.removeItem('cart');
        this.updateCartDisplay();
    }
}