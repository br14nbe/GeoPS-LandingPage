import es from './locale/es.js';
import en from './locale/en.js';

//INICIO DE INTERNACIONALIZACION
const savedLang = localStorage.getItem('lang') || 'es';

i18next.init({
    resources: {
        es,
        en
    },
    lng: savedLang,
    fallbackLng: savedLang
}).then(() => {
    updateContent();
    updateActiveLanguageButton();

    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    const langToggleBtn = document.getElementById('lang-toggle');

    function updateLangButtonText() {
        if (langToggleBtn) {
            langToggleBtn.textContent = i18next.language === 'es' ? 'EN' : 'ES';
        }
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = i18next.language === 'es' ? 'en' : 'es';
            i18next.changeLanguage(newLang).then(() => {
                localStorage.setItem('lang', newLang);
                updateContent();
                updateActiveLanguageButton();
                updateLangButtonText();
            });
        });

        updateLangButtonText();
    }
});

function updateNav() {
    document.querySelector('nav .nav-links a[href="#hero"]').textContent = i18next.t('nav.home');
    document.querySelector('nav .nav-links a[href="#features"]').textContent = i18next.t('nav.features');
    document.querySelector('nav .nav-links a[href="#sell-better"]').textContent = i18next.t('nav.sellBetter');
    document.querySelector('nav .nav-links a[href="#testimonials"]').textContent = i18next.t('nav.testimonials');
    document.querySelector('nav .nav-links a[href="#faq"]').textContent = i18next.t('nav.faq');
    document.querySelector('.auth-buttons .login').textContent = i18next.t('nav.login');
    document.querySelector('.auth-buttons .signup').textContent = i18next.t('nav.signup');
}

function updateMain() {
    document.querySelector('.hero h1').innerHTML = i18next.t('main.hero.title');
    document.querySelector('.hero p').textContent = i18next.t('main.hero.subtitle');
    document.querySelector('.hero .cta-button').textContent = i18next.t('main.hero.button');
    document.querySelector('.hero-image img').alt = i18next.t('main.hero.imgAlt');

    document.querySelector('.features h2').textContent = i18next.t('main.features.title');
    document.querySelector('.features span').textContent = i18next.t('main.features.subtitle');

    const featureCards = document.querySelectorAll('.feature-card');
    const featureKeys = ['location', 'promotions', 'connect'];
    featureCards.forEach((card, index) => {
        card.querySelector('h3').textContent = i18next.t(`main.features.items.${featureKeys[index]}.title`);
        card.querySelector('p').textContent = i18next.t(`main.features.items.${featureKeys[index]}.description`);
    });

    document.querySelector('.sell-content h2').textContent = i18next.t('main.sellBetter.title');
    document.querySelector('.sell-content p').textContent = i18next.t('main.sellBetter.description');
    document.querySelector('.sell-content .cta-button').textContent = i18next.t('main.sellBetter.ctaButton');

    document.querySelector('.stats-content h2').innerHTML = i18next.t('main.stats.title');
    document.querySelector('.stats-content p').textContent = i18next.t('main.stats.subtitle');

    const statLabels = ['members', 'businesses', 'clicks', 'payments'];
    document.querySelectorAll('.stat-text p').forEach((p, index) => {
        p.textContent = i18next.t(`main.stats.${statLabels[index]}`);
    });

    document.querySelector('.testimonials h2').textContent = i18next.t('main.testimonials.title');
    const testimonialsData = i18next.t('main.testimonials.users', { returnObjects: true });
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        const user = testimonialsData[index % testimonialsData.length];

        card.querySelector('.testimonial-text').textContent = `"${user.text}"`;
        card.querySelector('.testimonial-name').textContent = user.name;
        card.querySelector('.testimonial-position').textContent = user.role;
    });

    document.querySelector('.faq h2').textContent = i18next.t('main.faq.title');
    const faqItems = document.querySelectorAll('.faq-item');
    i18next.t('main.faq.items', { returnObjects: true }).forEach((item, index) => {
        faqItems[index].querySelector('.faq-question h3').textContent = item.question;
        faqItems[index].querySelector('.faq-answer p').textContent = item.answer;
    });

    document.querySelector('.cta-content h2').textContent = i18next.t('main.cta.title');
    document.querySelector('.cta-content .cta-button').textContent = i18next.t('main.cta.button');
}

function updateFooter() {
    document.querySelector('.footer-section:nth-child(1) h4').textContent = i18next.t('footer.company.title');
    document.querySelectorAll('.footer-section:nth-child(1) a').forEach((a, i) => {
        a.textContent = i18next.t(`footer.company.links.${i}`);
    });

    document.querySelector('.footer-section:nth-child(2) h4').textContent = i18next.t('footer.support.title');
    document.querySelectorAll('.footer-section:nth-child(2) a').forEach((a, i) => {
        a.textContent = i18next.t(`footer.support.links.${i}`);
    });

    document.querySelector('.footer-section:nth-child(3) h4').textContent = i18next.t('footer.newsletter.title');
    document.querySelector('.newsletter input').placeholder = i18next.t('footer.newsletter.placeholder');
}

function updateModals() {
    document.querySelector('#loginModal h2').textContent = i18next.t('modal.login.title');
    const loginInputs = document.querySelectorAll('#loginModal input');
    loginInputs[0].placeholder = i18next.t('modal.login.emailPlaceholder');
    loginInputs[1].placeholder = i18next.t('modal.login.passwordPlaceholder');
    document.querySelector('#loginModal button').textContent = i18next.t('modal.login.button');
    const loginRedirect = document.querySelector('#loginModal .auth-redirect');
    loginRedirect.childNodes[0].textContent = i18next.t('modal.login.redirect') + ' ';
    loginRedirect.querySelector('a').textContent = i18next.t('modal.login.link');

    document.querySelector('#registerModal h2').textContent = i18next.t('modal.register.title');
    const regInputs = document.querySelectorAll('#registerModal input');
    regInputs[0].placeholder = i18next.t('modal.register.namePlaceholder');
    regInputs[1].placeholder = i18next.t('modal.register.emailPlaceholder');
    regInputs[2].placeholder = i18next.t('modal.register.passwordPlaceholder');
    regInputs[3].placeholder = i18next.t('modal.register.confirmPasswordPlaceholder');
    document.querySelector('#registerModal button').textContent = i18next.t('modal.register.button');
    const regRedirect = document.querySelector('#registerModal .auth-redirect');
    regRedirect.childNodes[0].textContent = i18next.t('modal.register.redirect') + ' ';
    regRedirect.querySelector('a').textContent = i18next.t('modal.register.link');
}

function updateContent() {
    updateNav();
    updateMain();
    updateFooter();
    updateModals();
}

function updateActiveLanguageButton() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(button => {
        button.classList.toggle('active', button.dataset.lang === i18next.language);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.dataset.lang;
            i18next.changeLanguage(lang).then(() => {
                localStorage.setItem('lang', lang);
                updateContent();
                updateActiveLanguageButton();
            });
        });
    });
});

i18next.on('loaded', updateContent);

//FIN DE INTERNACIONALIZACION

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.classList.contains('login') || this.classList.contains('signup') 
            || this.classList.contains('open-register') || this.classList.contains('open-login')) return;

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
if (statsSection) observer.observe(statsSection);

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

    const totalWidth = testimonialTrack.scrollWidth / 2;
    if (Math.abs(position) >= totalWidth) position = 0;

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

function limpiarFormulario(form) {
    form.reset();
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

document.querySelector('#loginModal .auth-redirect a').addEventListener('click', (e) => {
    e.preventDefault();
    const loginForm = document.querySelector('#loginModal .auth-form');
    limpiarFormulario(loginForm);
    closeModal('loginModal');
    openModal('registerModal');
});

document.querySelector('#registerModal .auth-redirect a').addEventListener('click', (e) => {
    e.preventDefault();
    const registerForm = document.querySelector('#registerModal .auth-form');
    limpiarFormulario(registerForm);
    closeModal('registerModal');
    openModal('loginModal');
});

document.querySelector('.auth-buttons .login').addEventListener('click', (e) => {
    e.preventDefault();
    openModal('loginModal');
});

document.querySelector('.auth-buttons .signup').addEventListener('click', (e) => {
    e.preventDefault();
    openModal('registerModal');
});

document.querySelectorAll('.open-register').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        limpiarFormulario(document.querySelector('#loginModal .auth-form'));
        closeModal('loginModal');
        openModal('registerModal');
    });
});

document.querySelectorAll('.open-login').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        limpiarFormulario(document.querySelector('#registerModal .auth-form'));
        closeModal('registerModal');
        openModal('loginModal');
    });
});

document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        Swal.fire({
            title: i18next.t('alerts.inDevelopment'),
            text: i18next.t('alerts.inDevelopmentText'),
            icon: 'info',
            confirmButtonText: i18next.t('alerts.understood'),
            confirmButtonColor: '#007bff',
            background: '#fff',
            customClass: {
                confirmButton: 'btn btn-primary',
                popup: 'swal-custom-popup'
            },
            showClass: {
                popup: 'swal-custom-show'
            },
            zIndex: 9999
        });
    });
});