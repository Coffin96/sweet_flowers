document.addEventListener('DOMContentLoaded', () => {
    // Форма зворотного зв'язку
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = e.target.querySelector('input[type="text"]').value;
        const phone = e.target.querySelector('input[type="tel"]').value;
        const message = e.target.querySelector('textarea').value;

        // Проста клієнтська валідація
        if (!name || !phone || !message) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        try {
            // Імітація надсилання форми (замість реального API)
            const response = await fetch('/submit-form', {
                method: 'POST',
                body: JSON.stringify({ name, phone, message })
            });

            if (response.ok) {
                alert('Повідомлення надіслано успішно!');
                contactForm.reset();
            } else {
                alert('Помилка надсилання. Спробуйте пізніше.');
            }
        } catch (error) {
            console.error('Помилка:', error);
            alert('Технічні проблеми. Спробуйте пізніше.');
        }
    });

    // Інтерактивні анімації елементів
    const animatedElements = document.querySelectorAll('.product-card, .contact-form input, .contact-form textarea');
    
    animatedElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.05)';
            el.style.transition = 'transform 0.3s ease';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
        });
    });

    // Плавна прокрутка до секцій
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});