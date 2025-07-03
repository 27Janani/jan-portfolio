const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(45, 27, 105, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#c084fc';
    ctx.font = fontSize + 'px arial';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Animate skill bars
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simulate form submission with animation
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.style.background = 'linear-gradient(45deg, #ffaa00, #ff8800)';

    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #9333ea, #c084fc, #ddd6fe)';

        // Reset form
        this.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 2000);
    }, 2000);
});

// Resize matrix canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector('.hero .subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

setTimeout(typeWriter, 2000);

// Add particle cursor effect
let particles = [];

document.addEventListener('mousemove', (e) => {
    particles.push({
        x: e.clientX,
        y: e.clientY,
        life: 20
    });
});

function animateParticles() {
    particles = particles.filter(particle => particle.life > 0);

    particles.forEach(particle => {
        particle.life--;
        particle.y -= 2;

        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.left = particle.x + 'px';
        div.style.top = particle.y + 'px';
        div.style.width = '2px';
        div.style.height = '2px';
        div.style.background = '#c084fc';
        div.style.borderRadius = '50%';
        div.style.pointerEvents = 'none';
        div.style.opacity = particle.life / 20;
        div.style.zIndex = '9999';

        document.body.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 50);
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();