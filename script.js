// Animación suave para el scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetID = this.getAttribute('href');

        if (targetID === "#hero") {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetID);
            if (targetElement) {
                const rem = 4;
                const offset = rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Menú móvil
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    } else if (heroImage) {
        heroImage.style.transform = 'none';
    }
});