document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. TYPING EFFECT (amélioré avec curseur)
    // =========================================
    const textElement = document.querySelector('.typing-text');
    const texts = ["Développeur Fullstack", "Expert IA & Mobile", "Leader associatif", "Jeune entrepreneur"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    (function type() {
        currentText = texts[count % texts.length];
        
        if (isDeleting) {
            letter = currentText.substring(0, index - 1);
            index--;
        } else {
            letter = currentText.substring(0, index + 1);
            index++;
        }
        
        textElement.textContent = letter + '|';
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && index === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            count++;
            speed = 500;
        }
        
        setTimeout(type, speed);
    })();

    // =========================================
    // 2. NAVIGATION MOBILE
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // =========================================
    // 3. DARK MODE
    // =========================================
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // =========================================
    // 4. SCROLL REVEAL ANIMATION
    // =========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // Skills & Portfolio cards animation
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress')) {
                    entry.target.style.width = entry.target.getAttribute('data-width');
                }
                if (entry.target.classList.contains('portfolio-card')) {
                    entry.target.classList.add('show');
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-progress, .portfolio-card').forEach(el => cardObserver.observe(el));

    // =========================================
    // 5. PORTFOLIO FILTER (amélioré)
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card, i) => {
                card.classList.remove('show');
                card.classList.add('hidden');
                
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => card.classList.add('show'), i * 80);
                }
            });
        });
    });

    // =========================================
    // 6. HEADER SCROLL EFFECT (amélioré)
    // =========================================
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.style.boxShadow = "0 5px 30px rgba(0,0,0,0.12)";
            header.style.padding = "0";
        } else {
            header.style.boxShadow = "none";
            header.style.padding = "";
        }

        // Active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (currentScroll >= top && currentScroll < bottom) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });

        lastScroll = currentScroll;
    });

    // =========================================
    // 7. FLOATING PARTICLES (Hero)
    // =========================================
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const colors = ['#FF6F61', '#FF9A8B', '#FFB7A5', '#FF6F61'];
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 8 + 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                width: ${size}px; height: ${size}px;
                background: ${color};
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 8 + 6}s;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            particlesContainer.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => particle.remove(), 15000);
        }
        
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 300);
        }
        // Keep creating particles
        setInterval(createParticle, 800);
    }

    // =========================================
    // 8. CURSOR GLOW (Desktop only)
    // =========================================
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.classList.add('cursor-glow');
        document.body.appendChild(cursorGlow);
        
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // =========================================
    // 9. MAGNETIC BUTTONS
    // =========================================
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // =========================================
    // 10. GALLERY HORIZONTAL SCROLL + DRAG
    // =========================================
    const galleryTrack = document.getElementById('galleryTrack');
    if (galleryTrack) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        galleryTrack.addEventListener('mousedown', (e) => {
            if (e.target.closest('video')) return;
            isDown = true;
            galleryTrack.classList.add('dragging');
            startX = e.pageX - galleryTrack.offsetLeft;
            scrollLeft = galleryTrack.scrollLeft;
        });
        
        galleryTrack.addEventListener('mouseleave', () => {
            isDown = false;
            galleryTrack.classList.remove('dragging');
        });
        
        galleryTrack.addEventListener('mouseup', () => {
            isDown = false;
            galleryTrack.classList.remove('dragging');
        });
        
        galleryTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - galleryTrack.offsetLeft;
            const walk = (x - startX) * 2;
            galleryTrack.scrollLeft = scrollLeft - walk;
        });

        // Nav buttons
        const prevBtn = document.querySelector('.gallery-nav.prev');
        const nextBtn = document.querySelector('.gallery-nav.next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            galleryTrack.scrollBy({ left: -400, behavior: 'smooth' });
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            galleryTrack.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    // =========================================
    // 11. COUNTER ANIMATION (Stats)
    // =========================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h2 = entry.target.querySelector('h2');
                if (!h2 || h2.querySelector('i')) return;
                const target = parseInt(h2.textContent);
                if (isNaN(target)) return;
                const suffix = h2.textContent.includes('+') ? '+' : '';
                let current = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    h2.textContent = current + suffix;
                }, 40);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => counterObserver.observe(item));

    // =========================================
    // 12. TILT EFFECT ON CARDS
    // =========================================
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.service-card, .portfolio-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // =========================================
    // 13. SMOOTH SECTION TRANSITIONS
    // =========================================
    document.querySelectorAll('.section-header').forEach(header => {
        if (!header.classList.contains('reveal')) {
            header.classList.add('reveal');
            revealObserver.observe(header);
        }
    });

});
