/* ==== SERVICES PAGE JAVASCRIPT ==== */
/* JavaScript for snow effects, animations, and interactivity */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all page functionality
    initializeSnowEffect();
    initializeServiceCards();
    initializeScrollAnimations();
    initializeTitleAnimations();
});

/* ==== GLOBAL SNOW EFFECT ==== */
/* Creates the background snow effect consistent with other pages */

function initializeSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeSymbols = ['❄', '❅', '❆', '✦', '✧', '✩']; // Array of snowflake characters
    const maxSnowflakes = 50; // Maximum number of snowflakes on screen
    
    // Function to create a single snowflake
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake'; // Apply snowflake CSS class
        snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]; // Random symbol
        
        // Random horizontal position across viewport width
        snowflake.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration between 8-15 seconds
        snowflake.style.animationDuration = (Math.random() * 7 + 8) + 's';
        
        // Random delay before animation starts (0-5 seconds)
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        
        // Random size variation (0.8x to 1.4x base size)
        const scale = Math.random() * 0.6 + 0.8;
        snowflake.style.transform = `scale(${scale})`;
        
        // Random opacity for depth effect
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        
        // Add to snow container
        snowContainer.appendChild(snowflake);
        
        // Remove snowflake after animation completes to prevent memory leaks
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 20000); // Remove after 20 seconds (longer than max animation duration)
    }
    
    // Create initial batch of snowflakes
    for (let i = 0; i < maxSnowflakes; i++) {
        setTimeout(createSnowflake, i * 200); // Stagger creation every 200ms
    }
    
    // Continuously create new snowflakes to maintain count
    setInterval(createSnowflake, 800); // Create new snowflake every 800ms
}

/* ==== SERVICE CARD INTERACTIONS ==== */
/* Handles hover effects and card-specific snow animations */

function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card'); // Get all service cards
    const cardSnowflakeSymbols = ['❄', '❅', '✦', '✧']; // Symbols for card snow (subset of global)
    
    // Add event listeners to each service card
    serviceCards.forEach(card => {
        const cardSnowContainer = card.querySelector('.card-snow-container'); // Get card's snow container
        let cardSnowInterval; // Variable to store interval ID
        let isHovering = false; // Track hover state
        
        // Mouse enter event - start card snow effect
        card.addEventListener('mouseenter', function() {
            isHovering = true;
            startCardSnow(cardSnowContainer, cardSnowflakeSymbols);
            
            // Add continuous snow generation while hovering
            cardSnowInterval = setInterval(() => {
                if (isHovering) {
                    createCardSnowflake(cardSnowContainer, cardSnowflakeSymbols);
                }
            }, 300); // Create new card snowflake every 300ms
            
            // Add subtle card tilt effect
            card.style.transform = 'translateY(-8px) scale(1.02) rotateX(2deg)';
        });
        
        // Mouse leave event - stop card snow effect
        card.addEventListener('mouseleave', function() {
            isHovering = false;
            clearInterval(cardSnowInterval); // Stop creating new snowflakes
            
            // Reset card transform
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            
            // Fade out existing card snowflakes
            const existingFlakes = cardSnowContainer.querySelectorAll('.card-snowflake');
            existingFlakes.forEach(flake => {
                flake.style.opacity = '0'; // Fade out
                flake.style.transition = 'opacity 0.5s ease'; // Smooth fade
            });
        });
        
        // Add click effect for service cards
        card.addEventListener('click', function() {
            // Create ripple effect on click
            createRippleEffect(card, event);
            
            // Add temporary scale effect
            card.style.transform = 'translateY(-8px) scale(0.98) rotateX(2deg)';
            setTimeout(() => {
                card.style.transform = 'translateY(-8px) scale(1.02) rotateX(2deg)';
            }, 150);
        });
    });
}

/* ==== CARD SNOW FUNCTIONS ==== */
/* Functions to create and manage snow within service cards */

function startCardSnow(container, symbols) {
    // Create initial burst of card snowflakes
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createCardSnowflake(container, symbols);
        }, i * 100); // Stagger creation every 100ms
    }
}

function createCardSnowflake(container, symbols) {
    const snowflake = document.createElement('div');
    snowflake.className = 'card-snowflake'; // Apply card snowflake CSS class
    snowflake.innerHTML = symbols[Math.floor(Math.random() * symbols.length)]; // Random symbol
    
    // Random horizontal position within card width
    snowflake.style.left = Math.random() * 100 + '%';
    
    // Random animation duration between 3-6 seconds (faster than global snow)
    snowflake.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    // Random size variation (0.6x to 1.2x base size, smaller than global)
    const scale = Math.random() * 0.6 + 0.6;
    snowflake.style.transform = `scale(${scale})`;
    
    // Random opacity for depth effect
    snowflake.style.opacity = Math.random() * 0.8 + 0.3;
    
    // Add to card snow container
    container.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, 8000); // Remove after 8 seconds
}

/* ==== RIPPLE EFFECT ==== */
/* Creates a ripple effect when service cards are clicked */

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect(); // Get element position
    const size = Math.max(rect.width, rect.height); // Size based on largest dimension
    
    // Position ripple at click location
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Style the ripple element
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(191, 170, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    // Add ripple to clicked element
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// CSS animation for ripple effect (added dynamically)
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleAnimation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ==== SCROLL ANIMATIONS ==== */
/* Animates elements as they come into view during scrolling */

function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${cardIndex * 0.1}s`; // Stagger by 100ms
                }
                
                // Add staggered animation for testimonial cards
                if (entry.target.classList.contains('testimonial-card')) {
                    const testimonials = document.querySelectorAll('.testimonial-card');
                    const testimonialIndex = Array.from(testimonials).indexOf(entry.target);
                    entry.target.style.animationDelay = `${testimonialIndex * 0.2}s`; // Stagger by 200ms
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.service-card, .testimonial-card, .cta-section');
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

// CSS for scroll animations (added dynamically)
const scrollAnimationStyle = document.createElement('style');
scrollAnimationStyle.textContent = `
    .service-card, .testimonial-card, .cta-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .service-card.animate-in, .testimonial-card.animate-in, .cta-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(scrollAnimationStyle);

/* ==== TITLE ANIMATIONS ==== */
/* Animates section titles when they come into view */

function initializeTitleAnimations() {
    const titles = document.querySelectorAll('.section-header .title');
    const subtitles = document.querySelectorAll('.section-header .subtitle');
    
    // Create observer for title animations
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add show-title class for animation
                entry.target.classList.add('show-title');
                
                // Animate subtitle after title
                const subtitle = entry.target.parentNode.querySelector('.subtitle');
                if (subtitle) {
                    setTimeout(() => {
                        subtitle.classList.add('show-title');
                    }, 300); // Delay subtitle animation by 300ms
                }
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of title is visible
    });
    
    // Observe all titles
    titles.forEach(title => {
        titleObserver.observe(title);
    });
}

/* ==== UTILITY FUNCTIONS ==== */
/* Helper functions for various effects */

// Debounce function to limit function calls during rapid events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function to limit function calls to specific intervals
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add performance optimization for animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Disable animations if user prefers reduced motion
if (prefersReducedMotion.matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

/* ==== ERROR HANDLING ==== */
/* Basic error handling for animation functions */

window.addEventListener('error', function(e) {
    console.warn('Animation error caught:', e.error);
    // Continue execution without breaking the page
});

// Console log for debugging (remove in production)
console.log('Services page JavaScript loaded successfully');
console.log('Snow effects, card animations, and scroll animations initialized');