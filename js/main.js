/* ===================================
   KangLv ZhiJia - Main JavaScript
   Premium Interactions & Animations
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===================================
    // Preloader
    // ===================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
        }, 2000);
    });
    
    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // ===================================
    // Mobile Navigation
    // ===================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    if (navClose && navMenu) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // ===================================
    // Particle Effect
    // ===================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // CTA Particles
    function createCTAParticles() {
        const ctaParticles = document.getElementById('ctaParticles');
        if (!ctaParticles) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.background = 'rgba(255, 255, 255, 0.2)';
            ctaParticles.appendChild(particle);
        }
    }
    
    createCTAParticles();
    
    // ===================================
    // Counter Animation
    // ===================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('animate-stat')) {
                    const counter = entry.target.querySelector('.stat-number');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        const target = parseInt(counter.getAttribute('data-count'));
                        animateCounter(counter, target, 2000);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.reveal, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-stat, .animate-fade-in-up');
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
    
    // ===================================
    // Scroll Progress Indicator
    // ===================================
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // You could add a progress bar here if needed
        return scrollPercent;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ===================================
    // Parallax Effect
    // ===================================
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(function(el) {
            const speed = el.getAttribute('data-speed') || 0.5;
            el.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
    }
    
    window.addEventListener('scroll', handleParallax);
    
    // ===================================
    // Back to Top Button
    // ===================================
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Hero Slider (if used)
    // ===================================
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    const heroDots = document.getElementById('heroDots');
    let currentSlide = 0;
    const totalSlides = 3;
    
    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;
        
        // Update dots
        if (heroDots) {
            const dots = heroDots.querySelectorAll('.dot');
            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
    }
    
    if (heroPrev) {
        heroPrev.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (heroNext) {
        heroNext.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
    }
    
    if (heroDots) {
        const dots = heroDots.querySelectorAll('.dot');
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });
    }
    
    // Auto-slide
    setInterval(function() {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // ===================================
    // Form Handling (if forms exist)
    // ===================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Here you would typically send the data to a server
                console.log('Form submitted:', data);
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Remove error class on input
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // ===================================
    // Mouse Move Effect (Hero Section)
    // ===================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            const floatingCards = heroSection.querySelectorAll('.hero-floating-card');
            floatingCards.forEach(function(card, index) {
                const speed = (index + 1) * 20;
                const x = mouseX * speed;
                const y = mouseY * speed;
                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // ===================================
    // Tilt Effect for Cards
    // ===================================
    const tiltCards = document.querySelectorAll('.service-card-large, .advantage-card-large');
    
    tiltCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ===================================
    // Lazy Loading Images
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
    
    // ===================================
    // Active Navigation Link
    // ===================================
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // ===================================
    // Ripple Effect for Buttons
    // ===================================
    const rippleButtons = document.querySelectorAll('.btn');
    
    rippleButtons.forEach(function(button) {
        button.classList.add('ripple');
    });
    
    // ===================================
    // Typing Effect (if used)
    // ===================================
    function typeWriter(element, text, speed) {
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ===================================
    // GSAP-like Scroll Animations
    // ===================================
    function initScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll]');
        
        const elementInView = function(el, percentageScroll) {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) * percentageScroll
            );
        };
        
        const displayScrollElement = function(element) {
            element.classList.add('scrolled');
        };
        
        const handleScrollAnimation = function() {
            scrollElements.forEach(function(el) {
                if (elementInView(el, 0.85)) {
                    displayScrollElement(el);
                }
            });
        };
        
        window.addEventListener('scroll', handleScrollAnimation);
    }
    
    initScrollAnimations();
    
    // ===================================
    // Performance: Debounce Function
    // ===================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const later = function() {
                clearTimeout(timeout);
                func();
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ===================================
    // Performance: Throttle Function
    // ===================================
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }
    
    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c KangLv ZhiJia ', 'background: linear-gradient(135deg, #0066B3, #00A86B); color: white; font-size: 24px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Welcome to our premium wellness solutions platform! ', 'color: #0066B3; font-size: 14px;');
    
});

// ===================================
// Additional Utilities
// ===================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get random number between min and max
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Smooth scroll to element
function smoothScrollTo(element, offset) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Add class with delay
function addClassWithDelay(element, className, delay) {
    setTimeout(function() {
        element.classList.add(className);
    }, delay);
}

// Remove class with delay
function removeClassWithDelay(element, className, delay) {
    setTimeout(function() {
        element.classList.remove(className);
    }, delay);
}

// Toggle class
function toggleClass(element, className) {
    element.classList.toggle(className);
}

// Check for reduced motion preference
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}