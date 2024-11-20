document.addEventListener('DOMContentLoaded', () => {
    // Анімація секцій при скролі
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.animate-section').forEach(section => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Анімація навігації
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                color: '#FF3366',
                scale: 1.1,
                duration: 0.3
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                color: '#000',
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Текстові анімації
    const heroTitle = document.querySelector('.glitch-text');
    const heroSubtitle = document.querySelector('.typed-text');

    // Друкований ефект
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    typeWriter(heroSubtitle, heroSubtitle.textContent);
});