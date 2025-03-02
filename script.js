// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll === 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
});

function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;
    let overlay = document.querySelector('.mobile-nav-overlay');

    // Create overlay if it doesn't exist
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);
    }

    // Ensure hamburger is visible on mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    hamburger.style.display = isMobile ? 'flex' : 'none';

    // Set active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    // Add click events
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Handle resize events
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMobileChange(e) {
        hamburger.style.display = e.matches ? 'flex' : 'none';
        if (!e.matches && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    }

    mobileMediaQuery.addListener(handleMobileChange);
    handleMobileChange(mobileMediaQuery);
}

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active section highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Skills animation
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.progress').style.width = entry.target.querySelector('.progress').getAttribute('style').split(':')[1];
        }
    });
}, observerOptions);

skillCards.forEach(card => observer.observe(card));

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Clear form
    contactForm.reset();
    alert('Thank you for your message! I will get back to you soon.');
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-card, .skill-card, .stat-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Particle background effect for hero section
const createParticleBackground = () => {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        particle.style.animation = `float ${Math.random() * 3 + 2}s infinite`;
        
        hero.appendChild(particle);
    }
};

createParticleBackground();
