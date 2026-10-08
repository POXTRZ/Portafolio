(() => {
    'use strict';

    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    const progressBar = document.querySelector('.nav-progress');
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.primary-nav');
    const navLinks = [...document.querySelectorAll('.primary-nav a')];
    const languageButtons = [...document.querySelectorAll('[data-lang]')];
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    skipLink?.addEventListener('click', (event) => {
        event.preventDefault();
        mainContent?.focus({ preventScroll: true });
        mainContent?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        history.pushState(null, '', '#main-content');
    });

    let scrollTicking = false;
    const updateScrollUI = () => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
        header?.classList.toggle('is-scrolled', window.scrollY > 24);
        progressBar?.style.setProperty('--scroll-progress', progress.toFixed(4));
        scrollTicking = false;
    };
    updateScrollUI();
    window.addEventListener('scroll', () => {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(updateScrollUI);
    }, { passive: true });

    const currentLanguage = () => root.lang === 'es' ? 'es' : 'en';
    const updateMenuLabel = (open) => {
        if (!menuButton) return;
        const spanish = currentLanguage() === 'es';
        menuButton.setAttribute('aria-label', open ? (spanish ? 'Cerrar navegación' : 'Close navigation') : (spanish ? 'Abrir navegación' : 'Open navigation'));
    };
    const setMenu = (open, returnFocus = false) => {
        menuButton?.setAttribute('aria-expanded', String(open));
        navigation?.classList.toggle('is-open', open);
        document.body.classList.toggle('nav-open', open);
        updateMenuLabel(open);
        if (open) requestAnimationFrame(() => navLinks[0]?.focus());
        if (!open && returnFocus) menuButton?.focus();
    };
    menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 920) setMenu(false); });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    document.addEventListener('pointerdown', (event) => {
        if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
        if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) setMenu(false);
    });

    const setLanguage = (language) => {
        const nextLanguage = language === 'es' ? 'es' : 'en';
        root.lang = nextLanguage;
        root.style.setProperty('--lang-x', nextLanguage === 'es' ? '100%' : '0%');
        document.querySelectorAll('[data-en][data-es]').forEach((element) => {
            element.textContent = element.dataset[nextLanguage];
        });
        document.querySelectorAll('[data-aria-en][data-aria-es]').forEach((element) => {
            element.setAttribute('aria-label', nextLanguage === 'en' ? element.dataset.ariaEn : element.dataset.ariaEs);
        });
        document.querySelectorAll('[data-alt-en][data-alt-es]').forEach((element) => {
            element.setAttribute('alt', nextLanguage === 'en' ? element.dataset.altEn : element.dataset.altEs);
        });
        languageButtons.forEach((button) => {
            const active = button.dataset.lang === nextLanguage;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        const spanish = nextLanguage === 'es';
        document.title = spanish ? 'Hugo Ivan Romero Duarte | Desarrollador de Software Junior' : 'Hugo Ivan Romero Duarte | Junior Software Developer';
        document.querySelector('meta[name="description"]')?.setAttribute('content', spanish
            ? 'Portafolio de Hugo Ivan Romero Duarte, estudiante de Informática y desarrollador de software junior en Querétaro, enfocado en web, backend, mobile y cloud.'
            : 'Portfolio of Hugo Ivan Romero Duarte, a junior software developer and Informatics student in Querétaro, focused on web, backend, mobile and cloud.');
        updateMenuLabel(menuButton?.getAttribute('aria-expanded') === 'true');
        try { localStorage.setItem('portfolio-language', nextLanguage); } catch (_) { /* Storage can be disabled. */ }
    };

    languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
    let savedLanguage = 'en';
    try { savedLanguage = localStorage.getItem('portfolio-language') || 'en'; } catch (_) { /* Use English. */ }
    setLanguage(savedLanguage);

    const revealItems = [...document.querySelectorAll('.reveal')];
    const revealGroups = ['.timeline', '.stack-grid', '.project-list', '.credential-grid'];
    revealGroups.forEach((selector) => {
        document.querySelectorAll(`${selector} > .reveal`).forEach((element, index) => {
            element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
        });
    });
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -55px' });
        revealItems.forEach((element) => revealObserver.observe(element));
    } else {
        revealItems.forEach((element) => element.classList.add('is-visible'));
    }

    if ('IntersectionObserver' in window) {
        const sections = [...document.querySelectorAll('main section[id]')];
        const navObserver = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            navLinks.forEach((link) => {
                const active = link.getAttribute('href') === `#${visible.target.id}`;
                link.classList.toggle('is-active', active);
                if (active) link.setAttribute('aria-current', 'page');
                else link.removeAttribute('aria-current');
            });
        }, { rootMargin: '-28% 0px -62%', threshold: [0, .08, .25] });
        sections.forEach((section) => navObserver.observe(section));
    }

    const hero = document.querySelector('.hero');
    const parallaxLayers = [...document.querySelectorAll('[data-parallax]')];
    if (hero && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        let parallaxFrame = 0;
        let targetX = 0;
        let targetY = 0;
        const renderParallax = () => {
            parallaxLayers.forEach((layer) => {
                const depth = Number(layer.dataset.parallax || 1);
                layer.style.setProperty('--parallax-x', `${targetX * depth}px`);
                layer.style.setProperty('--parallax-y', `${targetY * depth}px`);
            });
            parallaxFrame = 0;
        };
        hero.addEventListener('pointermove', (event) => {
            const bounds = hero.getBoundingClientRect();
            targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
            targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 10;
            if (!parallaxFrame) parallaxFrame = requestAnimationFrame(renderParallax);
        });
        hero.addEventListener('pointerleave', () => {
            targetX = 0;
            targetY = 0;
            if (!parallaxFrame) parallaxFrame = requestAnimationFrame(renderParallax);
        });
    }

    const year = document.getElementById('current-year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
