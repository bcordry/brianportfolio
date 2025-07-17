// Contact page JavaScript for animations, phone reveal, and interactive effects

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all contact page functionality
    initSnowEffect();
    initParallaxEffect();
    initPhoneReveal();
    initContactAnimations();
    initParticleEffects();
    initProfileClick(); // Make sure this is called!
});

// Snow effect initialization (consistent with other pages)
function initSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return; // Exit if container doesn't exist
    
    // Create multiple snowflakes for realistic effect
    for (let i = 0; i < 50; i++) {
        createSnowflake(snowContainer);
    }
}

// Create individual snowflake element with random properties
function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake'; // CSS class for styling
    snowflake.innerHTML = '❄'; // Snowflake character
    
    // Random horizontal starting position
    snowflake.style.left = Math.random() * 100 + '%';
    // Random animation duration for varied falling speeds
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    // Random delay for staggered start times
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    // Random opacity for depth effect
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;
    // Random size for variety
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    
    container.appendChild(snowflake); // Add to container
    
    // Remove snowflake after animation completes to prevent memory leaks
    snowflake.addEventListener('animationend', function() {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
        // Create new snowflake to maintain count
        createSnowflake(container);
    });
}

// Parallax background effect for subtle movement
function initParallaxEffect() {
    const parallaxBg = document.getElementById('parallax-bg');
    if (!parallaxBg) return; // Exit if element doesn't exist
    
    // Listen for mouse movement across the page
    document.addEventListener('mousemove', function(e) {
        // Calculate mouse position as percentage of viewport
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply subtle transform based on mouse position
        const translateX = (mouseX - 0.5) * 20; // Max 10px movement
        const translateY = (mouseY - 0.5) * 20; // Max 10px movement
        
        parallaxBg.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
}

// Phone number reveal functionality
function initPhoneReveal() {
    const phoneButton = document.getElementById('phone-reveal');
    if (!phoneButton) return; // Exit if button doesn't exist
    
    const hiddenSpan = phoneButton.querySelector('.phone-hidden');
    const revealedSpan = phoneButton.querySelector('.phone-revealed');
    
    // Add click event listener to reveal phone number
    phoneButton.addEventListener('click', function() {
        // Hide the "Click to reveal" text
        hiddenSpan.style.display = 'none';
        // Show the actual phone number
        revealedSpan.style.display = 'inline';
        
        // Add visual feedback with animation
        phoneButton.style.transform = 'scale(1.05)';
        phoneButton.style.color = '#a855f7'; // Purple color
        
        // Reset scale after brief moment
        setTimeout(() => {
            phoneButton.style.transform = 'scale(1)';
        }, 150);
        

    });
}



// Initialize contact card animations and interactions
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    // Add staggered animation delays to cards
    contactCards.forEach((card, index) => {
        // Set animation delay based on card index
        card.style.animationDelay = (0.2 * index) + 's';
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            // Add subtle scale animation on hover
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animate profile rings with staggered timing
    const profileRings = document.querySelectorAll('.profile-ring');
    profileRings.forEach((ring, index) => {
        // Add random rotation animation
        ring.style.animation += `, rotate 20s linear infinite`;
        ring.style.animationDelay = (index * 0.5) + 's';
    });
}

// Initialize particle effects for CTA button
function initParticleEffects() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return; // Exit if button doesn't exist
    
    // Add click ripple effect
    ctaButton.addEventListener('click', function(e) {
        // Prevent default action temporarily for effect
        e.preventDefault();
        
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        
        // Position ripple at click location
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Add ripple to button
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
        
        // Navigate after effect
        setTimeout(() => {
            window.location.href = ctaButton.href;
        }, 300);
    });
    
    // Add floating particles on hover
    ctaButton.addEventListener('mouseenter', function() {
        createFloatingParticles(this);
    });
}

// Create floating particles around CTA button
function createFloatingParticles(button) {
    const particleCount = 6; // Number of particles to create
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random positioning around button
        const angle = (360 / particleCount) * i;
        const radius = 60; // Distance from button center
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        
        button.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

// Profile image click handler with speech bubble AND confetti
function initProfileClick() {
    const profileImage = document.querySelector('.profile-image');
    const speechBubble = document.getElementById('profile-speech-bubble');
    if (!profileImage || !speechBubble) return; // Exit if elements don't exist
    
    // List of witty, self-aware messages
    const messages = [
        "Your clicks do nothing.",
        "Thanks for clicking!",
        "I'm sorry you clicked this.",
        "Achievement unlocked: Clicked my face.",
        "This is not an Easter egg.",
        "You found the secret click zone.",
        "I hope this was worth it.",
        "Please stop poking me.",
        "404: Feature not found.",
        "You're persistent, I'll give you that.",
        "Why are you like this?",
        "Congratulations, you broke nothing.",
        "This feature is working as intended.",
        "You've discovered my secret weakness: clicks."
    ];
    
    let lastMessage = null; // Track last message to avoid repeats
    let hideTimeout = null; // Track timeout for hiding bubble
    
    // Add click event listener to profile image
    profileImage.addEventListener('click', function() {
        // === SPEECH BUBBLE LOGIC ===
        // Pick a random message, avoid repeating the last one
        let msg;
        do {
            msg = messages[Math.floor(Math.random() * messages.length)];
        } while (msg === lastMessage && messages.length > 1);
        lastMessage = msg;
        
        // Set and show the speech bubble
        speechBubble.textContent = msg;
        speechBubble.classList.add('show');
        speechBubble.style.display = 'block';
        
        // Clear any previous timeout
        if (hideTimeout) clearTimeout(hideTimeout);
        
        // Hide bubble after 2.5 seconds
        hideTimeout = setTimeout(() => {
            speechBubble.classList.remove('show');
            setTimeout(() => speechBubble.style.display = 'none', 300);
        }, 2500);
        
        // === CONFETTI LOGIC ===
        // Trigger confetti burst from profile image container
        triggerConfetti(profileImage.parentElement);
    });
    
    // Optional: Hide bubble if clicked directly
    speechBubble.addEventListener('click', function() {
        speechBubble.classList.remove('show');
        setTimeout(() => speechBubble.style.display = 'none', 300);
        if (hideTimeout) clearTimeout(hideTimeout);
    });
}

// Confetti burst function
function triggerConfetti(container) {
    const confettiCount = 18; // Number of confetti pieces
    const colors = ['#7c5fd3', '#a855f7', '#c084fc', '#fbbf24', '#f59e0b', '#10b981', '#06d6a0']; // Purple theme + some accent colors
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random color from our palette
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Position at center of container
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        
        // Random direction and distance for burst effect
        const angle = (360 / confettiCount) * i + (Math.random() - 0.5) * 30; // Slight randomization
        const distance = 60 + Math.random() * 40; // Random distance 60-100px
        const radians = angle * Math.PI / 180;
        const deltaX = Math.cos(radians) * distance;
        const deltaY = Math.sin(radians) * distance;
        
        // Set CSS custom properties for animation
        confetti.style.setProperty('--deltaX', deltaX + 'px');
        confetti.style.setProperty('--deltaY', deltaY + 'px');
        
        // Random rotation
        confetti.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        
        // Add to container
        container.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 1000); // Match animation duration
    }
}

// Intersection Observer for scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.contact-card, .profile-card, .cta-section');
    animatableElements.forEach(el => observer.observe(el));
}

// Utility function to add CSS keyframes dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Click ripple effect */
        .click-ripple {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleExpand {
            0% {
                width: 20px;
                height: 20px;
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        

        
        
        /* Ring rotation animation */
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Speech bubble styles */
        .profile-speech-bubble {
            position: absolute;
            left: 50%;
            top: -30px;
            transform: translateX(-50%) translateY(-100%);
            background: rgba(40, 32, 70, 0.95);
            color: #fff;
            font-family: 'Oswald', sans-serif;
            font-size: 1rem;
            padding: 0.9em 1.3em;
            border-radius: 18px;
            box-shadow: 0 4px 24px rgba(124,95,211,0.18);
            white-space: nowrap;
            z-index: 10;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s, transform 0.3s;
        }
        
        .profile-speech-bubble.show {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(-50%) translateY(-120%);
        }
        
        .profile-speech-bubble::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -12px;
            transform: translateX(-50%);
            border-width: 8px 10px 0 10px;
            border-style: solid;
            border-color: rgba(40, 32, 70, 0.95) transparent transparent transparent;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles when page loads
addDynamicStyles();