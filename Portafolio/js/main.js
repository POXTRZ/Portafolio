// Animación del header al hacer scroll
let prevScrollPos = window.pageYOffset;
const header = document.querySelector('.header');

window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    
    if (prevScrollPos > currentScrollPos) {
        header.style.top = "0";
        header.style.backgroundColor = currentScrollPos > 50 ? 
            "rgba(18, 18, 18, 0.95)" : "rgba(18, 18, 18, 0.8)";
    } else {
        header.style.top = "-100px";
    }
    
    prevScrollPos = currentScrollPos;
};

// Animación de typing mejorada
const typingText = document.querySelector('.typing-animation');
const text = typingText.textContent;
typingText.textContent = '';

let charIndex = 0;
function typeText() {
    if (charIndex < text.length) {
        typingText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Iniciar la animación cuando el elemento es visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeText();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(typingText);

// Animación de números en las estadísticas
const stats = document.querySelectorAll('.stat-number');
const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            let count = 0;
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60 FPS

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    entry.target.textContent = Math.min(Math.round(count), target) + '+';
                    requestAnimationFrame(updateCount);
                }
            };

            updateCount();
            observer.unobserve(entry.target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats);
stats.forEach(stat => statsObserver.observe(stat));

// Manejo mejorado del formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animación de envío
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulación de envío (reemplazar con tu lógica de envío real)
        setTimeout(() => {
            submitBtn.textContent = '¡Enviado!';
            submitBtn.style.backgroundColor = 'var(--accent-color)';
            
            // Resetear el formulario y el botón después de un momento
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 2000);
        }, 1500);
    });
    // Canvas setup for stars animation
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Make canvas full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animación de las barras de progreso de habilidades
const skillBars = document.querySelectorAll('.progress-bar');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.width || '0%';
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    bar.style.width = '0%';
    skillsObserver.observe(bar);
});
}
