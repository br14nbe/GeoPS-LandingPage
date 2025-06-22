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

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsNumbers = entry.target.querySelectorAll('.stat-item h3');
            statsNumbers.forEach(number => {
                const finalValue = parseInt(number.textContent.replace(/,/g, ''));
                animateValue(number, 0, finalValue, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    observer.observe(statsSection);
}

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

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonials = document.querySelectorAll('.testimonial-card');

testimonials.forEach(testimonial => {
    const clone = testimonial.cloneNode(true);
    testimonialTrack.appendChild(clone);
});

let position = 0;
const speed = 2;

function moveSlider() {
    position -= speed;

    if (position <= -(testimonials.length * testimonials[0].offsetWidth)) {
        position = 0;
    }

    testimonialTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(moveSlider);
}

moveSlider();

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(i => {
            i.classList.remove('active');
            const ans = i.querySelector('.faq-answer');
            ans.style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});