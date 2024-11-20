class InteractiveEffects {
    constructor() {
        this.initParallax();
        this.initMouseTracker();
        this.initProductInteractions();
        this.initWebGLBackground();
    }

    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-section');
        
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            parallaxElements.forEach(section => {
                const speed = 0.1;
                const x = (clientX - window.innerWidth / 2) * speed;
                const y = (clientY - window.innerHeight / 2) * speed;
                
                section.style.transform = `translate(${-x}px, ${-y}px)`;
            });
        });
    }

    initMouseTracker() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    initProductInteractions() {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            product.addEventListener('mouseenter', () => {
                gsap.to(product, {
                    scale: 1.05,
                    rotation: 2,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    duration: 0.3
                });
            });

            product.addEventListener('mouseleave', () => {
                gsap.to(product, {
                    scale: 1,
                    rotation: 0,
                    boxShadow: 'none',
                    duration: 0.3
                });
            });
        });
    }

    initWebGLBackground() {
        const canvas = document.getElementById('background-canvas');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Створення динамічного фону з частинками
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0xFF69B4,
            transparent: true
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 10;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveEffects();
});