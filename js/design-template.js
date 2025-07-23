/* ==== DESIGN TEMPLATE PAGE JAVASCRIPT ==== */
/* Handles snow effects, filtering, animations, and interactive features */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ==== SNOW EFFECT INITIALIZATION ==== //
    initializeSnowEffect();
    
    // ==== FILTER FUNCTIONALITY ==== //
    initializeFilters();
    
    // ==== ENHANCED HOVER EFFECTS ==== //
    initializeHoverEffects();
    
    // ==== STAGGERED CARD ANIMATIONS ==== //
    initializeCardAnimations();
    
    // ==== PARALLAX SCROLL EFFECTS ==== //
    initializeParallaxEffects();
});

// ==== SNOW EFFECT FUNCTIONS ==== //

function initializeSnowEffect() {
    const snowContainer = document.getElementById('snow-container'); // Get snow container element
    const snowflakeCount = 50; // Number of snowflakes to create
    
    // Create individual snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowContainer, i); // Create each snowflake with delay
    }
}

function createSnowflake(container, index) {
    const snowflake = document.createElement('div'); // Create snowflake element
    snowflake.className = 'snow-dot'; // Add snow-dot class for styling
    
    // Randomize snowflake properties for natural effect
    const startX = Math.random() * window.innerWidth; // Random horizontal start position
    const animationDuration = 8 + Math.random() * 10; // Random fall duration (8-18 seconds)
    const size = 2 + Math.random() * 4; // Random size (2-6px)
    const opacity = 0.3 + Math.random() * 0.7; // Random opacity (0.3-1.0)
    const delay = Math.random() * 5; // Random start delay (0-5 seconds)
    
    // Apply randomized styles to snowflake
    snowflake.style.left = startX + 'px'; // Set horizontal position
    snowflake.style.width = size + 'px'; // Set width
    snowflake.style.height = size + 'px'; // Set height
    snowflake.style.opacity = opacity; // Set opacity
    snowflake.style.animationDuration = animationDuration + 's'; // Set fall speed
    snowflake.style.animationDelay = delay + 's'; // Set start delay
    
    // Add slight horizontal drift for more natural movement
    const drift = -10 + Math.random() * 20; // Random drift (-10 to 10px)
    snowflake.style.setProperty('--drift', drift + 'px'); // Set CSS custom property
    
    container.appendChild(snowflake); // Add snowflake to container
    
    // Remove and recreate snowflake when animation completes for continuous effect
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.remove(); // Remove completed snowflake
            createSnowflake(container, index); // Create new snowflake
        }
    }, (animationDuration + delay) * 1000); // Wait for animation to complete
}

// ==== FILTER FUNCTIONALITY ==== //

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn'); // Get all filter buttons
    const templateCards = document.querySelectorAll('.template-card'); // Get all template cards
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter'); // Get filter value
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active')); // Remove active from all
            this.classList.add('active'); // Add active to clicked button
            
            // Filter template cards with animation
            filterCards(templateCards, filterValue);
        });
    });
}

function filterCards(cards, filterValue) {
    cards.forEach((card, index) => {
        const cardPalette = card.getAttribute('data-palette'); // Get card's palette type
        const shouldShow = filterValue === 'all' || cardPalette === filterValue; // Determine if card should show
        
        if (shouldShow) {
            // Show card with staggered animation
            setTimeout(() => {
                card.style.display = 'block'; // Make card visible
                card.style.opacity = '0'; // Start invisible
                card.style.transform = 'translateY(30px) scale(0.9)'; // Start below and smaller
                
                // Animate card in
                setTimeout(() => {
                    card.style.opacity = '1'; // Fade in
                    card.style.transform = 'translateY(0) scale(1)'; // Move to position and normal size
                }, 50); // Small delay for smooth transition
            }, index * 50); // Stagger each card by 50ms
        } else {
            // Hide card with fade out animation
            card.style.opacity = '0'; // Fade out
            card.style.transform = 'translateY(-30px) scale(0.9)'; // Move up and shrink
            
            // Hide card after animation completes
            setTimeout(() => {
                card.style.display = 'none'; // Hide from layout
            }, 300); // Wait for fade out animation
        }
    });
}

// ==== ENHANCED HOVER EFFECTS ==== //

function initializeHoverEffects() {
    const templatePreviews = document.querySelectorAll('.template-preview'); // Get all template previews
    
    templatePreviews.forEach(preview => {
        // Add mouse enter event for enhanced hover effects
        preview.addEventListener('mouseenter', function() {
            enhanceHoverEffect(this); // Apply enhanced hover
        });
        
        // Add mouse leave event to reset effects
        preview.addEventListener('mouseleave', function() {
            resetHoverEffect(this); // Reset to normal state
        });
        
        // Add mouse move event for dynamic effects
        preview.addEventListener('mousemove', function(e) {
            addMouseTrackingEffect(this, e); // Add mouse tracking
        });
    });
}

function enhanceHoverEffect(element) {
    const title = element.querySelector('.template-title'); // Get title element
    const text = element.querySelector('.template-text'); // Get text element
    const icons = element.querySelector('.template-icons'); // Get icons element
    
    // Enhanced title animation
    if (title) {
        title.style.transform = 'scale(1.15) translateY(-5px)'; // Scale and lift title
        title.style.textShadow = '0 4px 20px rgba(0,0,0,0.2)'; // Add stronger shadow
        title.style.letterSpacing = '0.1em'; // Increase letter spacing
    }
    
    // Enhanced text animation
    if (text) {
        text.style.transform = 'translateY(-8px)'; // Lift text more
        text.style.opacity = '1'; // Full opacity
        text.style.fontWeight = '500'; // Slightly bolder
    }
    
    // Enhanced icons animation
    if (icons) {
        icons.style.transform = 'scale(1.3) rotate(10deg)'; // Larger scale and more rotation
        icons.style.filter = 'brightness(1.2)'; // Brighten icons
    }
    
    // Add subtle background animation
    element.style.backgroundSize = '110%'; // Slightly enlarge background
    element.style.filter = 'brightness(1.05) saturate(1.1)'; // Enhance colors
}

function resetHoverEffect(element) {
    const title = element.querySelector('.template-title'); // Get title element
    const text = element.querySelector('.template-text'); // Get text element
    const icons = element.querySelector('.template-icons'); // Get icons element
    
    // Reset title to normal state
    if (title) {
        title.style.transform = ''; // Reset transform
        title.style.textShadow = ''; // Reset shadow
        title.style.letterSpacing = ''; // Reset letter spacing
    }
    
    // Reset text to normal state
    if (text) {
        text.style.transform = ''; // Reset transform
        text.style.opacity = ''; // Reset opacity
        text.style.fontWeight = ''; // Reset weight
    }
    
    // Reset icons to normal state
    if (icons) {
        icons.style.transform = ''; // Reset transform
        icons.style.filter = ''; // Reset filter
    }
    
    // Reset background effects
    element.style.backgroundSize = ''; // Reset background size
    element.style.filter = ''; // Reset filter
}

function addMouseTrackingEffect(element, event) {
    const rect = element.getBoundingClientRect(); // Get element position
    const x = event.clientX - rect.left; // Mouse X relative to element
    const y = event.clientY - rect.top; // Mouse Y relative to element
    const centerX = rect.width / 2; // Element center X
    const centerY = rect.height / 2; // Element center Y
    
    // Calculate rotation based on mouse position
    const rotateX = (y - centerY) / 20; // Vertical tilt
    const rotateY = (centerX - x) / 20; // Horizontal tilt
    
    // Apply 3D transform based on mouse position
    element.style.transform = `
        translateY(-10px) 
        scale(1.05) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        perspective(1000px)
    `; // 3D perspective effect
}

// ==== CARD ANIMATIONS ==== //

function initializeCardAnimations() {
    const cards = document.querySelectorAll('.template-card'); // Get all template cards
    
    // Set up intersection observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of card is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before card enters viewport
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when card enters viewport
                entry.target.classList.add('animate-in'); // Add animation class
                cardObserver.unobserve(entry.target); // Stop observing this card
            }
        });
    }, observerOptions);
    
    // Observe all cards for scroll animations
    cards.forEach(card => {
        cardObserver.observe(card); // Start observing each card
    });
}

// ==== PARALLAX SCROLL EFFECTS ==== //

function initializeParallaxEffects() {
    let ticking = false; // Throttle scroll events for performance
    
    // Add scroll event listener for parallax effects
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax); // Use RAF for smooth animation
            ticking = true; // Set throttle flag
        }
    });
    
    function updateParallax() {
        const scrolled = window.pageYOffset; // Get scroll position
        const rate = scrolled * -0.5; // Parallax rate (negative for upward movement)
        
        // Apply parallax to page header
        const pageHeader = document.querySelector('.page-header'); // Get page header
        if (pageHeader) {
            pageHeader.style.transform = `translateY(${rate * 0.3}px)`; // Subtle parallax movement
        }
        
        // Apply parallax to filter controls
        const filterControls = document.querySelector('.filter-controls'); // Get filter controls
        if (filterControls) {
            filterControls.style.transform = `translateY(${rate * 0.2}px)`; // Even more subtle movement
        }
        
        ticking = false; // Reset throttle flag
    }
}

// ==== UTILITY FUNCTIONS ==== //

// Function to add ripple effect on card click
function addRippleEffect(element, event) {
    const ripple = document.createElement('span'); // Create ripple element
    const rect = element.getBoundingClientRect(); // Get element bounds
    const size = Math.max(rect.width, rect.height); // Calculate ripple size
    const x = event.clientX - rect.left - size / 2; // Calculate X position
    const y = event.clientY - rect.top - size / 2; // Calculate Y position
    
    // Style the ripple element
    ripple.style.width = ripple.style.height = size + 'px'; // Set size
    ripple.style.left = x + 'px'; // Set X position
    ripple.style.top = y + 'px'; // Set Y position
    ripple.classList.add('ripple'); // Add ripple class
    
    element.appendChild(ripple); // Add ripple to element
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove(); // Clean up ripple element
    }, 600); // Wait for ripple animation to complete
}

// Function to generate random color variations
function generateColorVariation(baseColor, variation = 20) {
    // This function could be used to create dynamic color variations
    // Implementation would depend on specific color manipulation needs
    return baseColor; // Placeholder return
}

// Function to preload fonts for better performance
function preloadFonts() {
    const fontFamilies = [
        'Playfair Display',
        'Inter',
        'Montserrat',
        'Lora',
        'Poppins',
        'Crimson Text',
        'Source Sans Pro',
        'Merriweather',
        'Roboto',
        'Open Sans',
        'Oswald',
        'Ysabeau SC'
    ]; // List of fonts used in templates
    
    // Create hidden elements to trigger font loading
    fontFamilies.forEach(font => {
        const testElement = document.createElement('div'); // Create test element
        testElement.style.fontFamily = font; // Set font family
        testElement.style.position = 'absolute'; // Position off-screen
        testElement.style.left = '-9999px'; // Move off-screen
        testElement.textContent = 'Font loading test'; // Add text content
        document.body.appendChild(testElement); // Add to DOM to trigger loading
        
        // Remove test element after short delay
        setTimeout(() => {
            testElement.remove(); // Clean up test element
        }, 100);
    });
}

// Initialize font preloading
preloadFonts();

// ==== ACCESSIBILITY ENHANCEMENTS ==== //

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        // Add focus indicators for keyboard navigation
        document.body.classList.add('keyboard-navigation'); // Add class for keyboard users
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation'); // Remove class for mouse users
});

// ==== PERFORMANCE OPTIMIZATIONS ==== //

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout; // Timeout reference
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout); // Clear existing timeout
            func(...args); // Execute function
        };
        clearTimeout(timeout); // Clear existing timeout
        timeout = setTimeout(later, wait); // Set new timeout
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle; // Throttle flag
    return function() {
        const args = arguments; // Function arguments
        const context = this; // Function context
        if (!inThrottle) {
            func.apply(context, args); // Execute function
            inThrottle = true; // Set throttle flag
            setTimeout(() => inThrottle = false, limit); // Reset flag after limit
        }
    };
}
