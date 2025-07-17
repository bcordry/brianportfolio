// Work Journey Page JavaScript
// Handles map interactivity, modal functionality, slideshow, and snow effects

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {

    // Initialize all functionality
    initSnowEffect();    // Start the snow animation
    initMapInteractivity();    // Set up map click/hover events
    initModal();    // Set up modal functionality
    //initSlideshow();    // Set up slideshow controls
    initPageAnimations();    // Start page load animations

});

// Snow Effect - Reused from index page with same styling
function initSnowEffect() {
    const snowContainer = document.getElementById('snow-container'); // Get snow container element
    const snowflakeSymbols = ['❄', '❅', '❆']; // Array of snowflake symbols to use
    const maxSnowflakes = 50; // Maximum number of snowflakes on screen

    // Function to create a single snowflake
    function createSnowflake() {
        const snowflake = document.createElement('div'); // Create div element for snowflake
        snowflake.className = 'snowflake'; // Add snowflake CSS class
        snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]; // Random symbol

        // Set random horizontal position across screen width
        snowflake.style.left = Math.random() * 100 + 'vw';

        // Set random animation duration between 3-8 seconds
        snowflake.style.animationDuration = (Math.random() * 5 + 3) + 's';

        // Set random delay before animation starts (0-2 seconds)
        snowflake.style.animationDelay = Math.random() * 2 + 's';

        // Set random size between 0.8em and 1.5em
        snowflake.style.fontSize = (Math.random() * 0.7 + 0.8) + 'em';

        // Set random opacity between 0.6 and 1
        snowflake.style.opacity = Math.random() * 0.4 + 0.6;

        // Add snowflake to container
        snowContainer.appendChild(snowflake);

        // Remove snowflake after animation completes to prevent memory leaks
        setTimeout(() => {
            if (snowflake.parentNode) { // Check if element still exists
                snowflake.parentNode.removeChild(snowflake); // Remove from DOM
            }
        }, 8000); // Remove after 8 seconds (max animation duration)
    }

    // Create initial batch of snowflakes
    for (let i = 0; i < maxSnowflakes; i++) {
        setTimeout(createSnowflake, i * 100); // Stagger creation by 100ms each
    }

    // Continue creating snowflakes at intervals
    setInterval(createSnowflake, 300); // Create new snowflake every 300ms
}

// Map Interactivity - Handle clicks and hovers on states and pins
function initMapInteractivity() {

    // Get all clickable states from the SVG
    const states = document.querySelectorAll('.clickable-state');

    // Get all location pins from the SVG
    const pins = document.querySelectorAll('.location-pin');

    // Add event listeners to each state
    states.forEach(state => {

        // Mouse enter event - add hover effects
        state.addEventListener('mouseenter', function() {
            // Add hover class for CSS styling
            this.classList.add('state-hover');

            // Get the corresponding pin for this state
            const location = this.dataset.location; // Get location data attribute
            const correspondingPin = document.querySelector(`[data-location="${location}"]`);

            // Highlight the corresponding pin
            if (correspondingPin) {
                correspondingPin.classList.add('pin-hover'); // Add hover class to pin
            }
        });

        // Mouse leave event - remove hover effects
        state.addEventListener('mouseleave', function() {
            // Remove hover class
            this.classList.remove('state-hover');

            // Remove hover from corresponding pin
            const location = this.dataset.location;
            const correspondingPin = document.querySelector(`[data-location="${location}"]`);

            if (correspondingPin) {
                correspondingPin.classList.remove('pin-hover'); // Remove hover class from pin
            }
        });

        // Click event - open modal with location details
        state.addEventListener('click', function() {
            const location = this.dataset.location; // Get location identifier
            const city = this.dataset.city; // Get city name
            const stateOrCountry = this.dataset.state; // Get state/country name

            // Open modal with this location's information
            openLocationModal(location, city, stateOrCountry);
        });
    });

    // Add event listeners to each pin (same functionality as states)
    pins.forEach(pin => {

        // Click event for pins
        pin.addEventListener('click', function() {
            const location = this.dataset.location; // Get location identifier

            // Find the corresponding state to get city and state info
            const correspondingState = document.querySelector(`[data-location="${location}"]`);

            if (correspondingState) {
                const city = correspondingState.dataset.city;
                const stateOrCountry = correspondingState.dataset.state;

                // Open modal with location information
                openLocationModal(location, city, stateOrCountry);
            }
        });

        // Hover effects for pins
        pin.addEventListener('mouseenter', function() {
            this.classList.add('pin-hover'); // Add hover class
        });

        pin.addEventListener('mouseleave', function() {
            this.classList.remove('pin-hover'); // Remove hover class
        });
    });
}

// Modal Functionality - Handle opening, closing, and content management
function initModal() {

    // Get modal elements
    const modal = document.getElementById('location-modal'); // Main modal container
    const modalBackdrop = document.querySelector('.modal-backdrop'); // Background overlay
    const closeButton = document.querySelector('.modal-close'); // Close button

    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking the backdrop (outside the modal content)
    modalBackdrop.addEventListener('click', closeModal);

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(); // Close if Escape is pressed and modal is open
        }
    });

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('active'); // Remove active class to hide modal

        // Re-enable body scrolling
        document.body.style.overflow = 'auto';

        // Reset slideshow to first slide when closing
        resetSlideshow();
    }

    // Make closeModal function available globally
    window.closeModal = closeModal;
}

// Function to open modal with specific location data
function openLocationModal(location, city, stateOrCountry) {

    // Get modal elements for updating content
    const modal = document.getElementById('location-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalRole = document.getElementById('modal-role');
    const modalDescription = document.getElementById('modal-description');
    const modalDuration = document.getElementById('modal-duration');
    const modalCompany = document.getElementById('modal-company');

    // Location data object
    const locationData = {
        'los-angeles': {
            role: 'Team Owner',
            company: 'Winterfox, Evil Geniuses, Velocity eSports',
            duration: '2013-2016',
            description: 'Founded and managed a professional esports team featuring international and local players competing in the premier esports league (League Championship Series), overseeing contract negotiations, sponsorships, payroll, P-1 Visas, and day-to-day team logistics. Led the team to improved records season-over-season and established a strong online presence.',
            images: [
                "assets/images/portraits/brian-winterfox-onstage-coach.jpg",
                "assets/images/portraits/winterfox-vs-cloud9.jpg",
                "assets/images/portraits/winterfox-victory-shot.jpg"
            ]
        },
        'las-vegas': {
            role: 'Esports Manager',
            company: 'Vie.gg - Esports Betting Platform',
            duration: '2017-2018',
            description: 'One of first five employees at a startup esports betting platform. Developed and executed esports strategy, including partnerships with teams and leagues, content creation, and community engagement. Played a key role in launching the platform and establishing its presence in the esports industry.',
            images: [
                "https://via.placeholder.com/400x300/7c5fd3/ffff?text=Vegas+Image+1",
                "https://via.placeholder.com/400x300/bfaaff/ffff?text=Vegas+Image+2",
                "https://via.placeholder.com/400x300/e6e6fa/7c5fd3?text=Vegas+Image+3"
            ]
        },
        'denver': {
            role: 'Project Manager',
            company: 'Esports Entertainment Group, EGL',
            duration: '2019-2024',
            description: 'Managed multiple projects including website development, community engagement initiatives, and esports events. Traveled nation-wide to oversee events and manage logistics. Played a key role in expanding the company\'s reach in the esports industry, particularly in partnerships with traditional sports teams.',
            images: [
                "https://via.placeholder.com/400x300/7c5fd3/ffff?text=Denver+Image+1",
                "https://via.placeholder.com/400x300/bfaaff/ffff?text=Denver+Image+2",
                "https://via.placeholder.com/400x300/e6e6fa/7c5fd3?text=Denver+Image+3"
            ]
        },
        'chicago': {
            role: 'Team Owner, Digital Producer, Content Manager',
            company: 'Winterfox',
            duration: '2015-2017',
            description: 'Handled international player recruitment and visa management, extremely unique sponsorship integrations, and the development of one of the first documentary-style content series in esports. Managed team operations, content production, and community engagement for multiple divisions, leading to a significant increase in fanbase and sponsorships. Traveled with the team to multiple international tournaments.',
            images: [
                "assets/images/portraits/winterfox-chicago-office-1.jpg",
                "assets/images/portraits/winterfox-in-chicago.jpg",
                "assets/images/portraits/winterfox-chicago-office-2.jpg"
            ]
        },
        'jolly-harbour': {
            role: 'Head of Esports',
            company: 'Esports Entertainment Group',
            duration: '2018-2019',
            description: 'Worked internationally and managed the local office in Jolly Harbour, Antigua. Focused on esports strategy, website development, and community engagement for the upstart company. Developed and executed successful esports campaigns, helping the company eventually IPO in 2020. <I know Antigua is further south and not this big! Forgive me, I just wanted to include within the bounds of the map.>',
            images: [
                "https://via.placeholder.com/400x300/7c5fd3/ffff?text=Antigua+Image+1",
                "https://via.placeholder.com/400x300/bfaaff/ffff?text=Antigua+Image+2",
                "https://via.placeholder.com/400x300/e6e6fa/7c5fd3?text=Antigua+Image+3"
            ]
        }
    };

    // Get data for the selected location
    const data = locationData[location];

    // Update modal content with location-specific information
    modalTitle.textContent = city; // Set city name as title
    modalSubtitle.textContent = stateOrCountry; // Set state/country as subtitle
    modalRole.textContent = data.role; // Set job role
    modalDescription.textContent = data.description; // Set job description
    modalDuration.textContent = `Duration: ${data.duration}`; // Set duration
    modalCompany.textContent = `Company: ${data.company}`; // Set company name

    // Dynamically generate slideshow content
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    const indicatorsContainer = document.querySelector('.slide-indicators');

    // Clear any existing slides and indicators
    slideshowWrapper.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    // Create slides and indicators for each image
    data.images.forEach((imgSrc, idx) => {
        // Create slide div
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide' + (idx === 0 ? ' active' : '');
        
        // Create image element
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${city} image ${idx + 1}`;
        slideDiv.appendChild(img);
        slideshowWrapper.appendChild(slideDiv);

        // Create indicator button
        const indicatorBtn = document.createElement('button');
        indicatorBtn.className = 'indicator' + (idx === 0 ? ' active' : '');
        indicatorBtn.setAttribute('data-slide', idx);
        indicatorsContainer.appendChild(indicatorBtn);
    });

    // Initialize slideshow functionality for this modal instance
    initDynamicSlideshow();

    // Show the modal
    modal.classList.add('active'); // Add active class to show modal

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Dynamic Slideshow Functionality - Handle image navigation and indicators
function initDynamicSlideshow() {
    // Get slideshow elements (now dynamically created)
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slide-nav.prev');
    const nextButton = document.querySelector('.slide-nav.next');
    const indicators = document.querySelectorAll('.indicator');

    let currentSlide = 0; // Track current slide index

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Remove active class from all indicators
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        if (slides[index] && indicators[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }

        // Update current slide index
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Remove any existing event listeners to prevent duplicates
    const newPrevButton = prevButton.cloneNode(true);
    const newNextButton = nextButton.cloneNode(true);
    prevButton.parentNode.replaceChild(newPrevButton, prevButton);
    nextButton.parentNode.replaceChild(newNextButton, nextButton);

    // Add event listeners to navigation buttons
    newPrevButton.addEventListener('click', prevSlide);
    newNextButton.addEventListener('click', nextSlide);

    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Store slideshow functions globally for keyboard navigation
    window.currentSlideshow = {
        nextSlide,
        prevSlide,
        showSlide: (index) => showSlide(index),
        totalSlides: slides.length
    };
}

// Global keyboard navigation for slideshow
document.addEventListener('keydown', function(event) {
    // Only handle keyboard events when modal is open
    const modal = document.getElementById('location-modal');
    if (!modal.classList.contains('active') || !window.currentSlideshow) return;

    // Handle arrow keys
    if (event.key === 'ArrowRight') {
        window.currentSlideshow.nextSlide();
    } else if (event.key === 'ArrowLeft') {
        window.currentSlideshow.prevSlide();
    }
});

// Global reset function
window.resetSlideshow = function() {
    if (window.currentSlideshow) {
        window.currentSlideshow.showSlide(0);
    }
};

function initPageAnimations() {
  // Animate route lines
  const lines = document.querySelectorAll('.route-line');
  lines.forEach((line, i) => {
    setTimeout(() => {
      animateRouteLine(line, 2500);
    }, i * 1000);
  });

  // Animate pins and labels
  const pins = document.querySelectorAll('.location-pin');
  const labels = document.querySelectorAll('.pin-label');
  pins.forEach((pin, i) => {
    pin.setAttribute('r', 0);
    setTimeout(() => {
      pin.classList.add('animated');
      animatePinRadius(pin, 0, 8, 400);
    }, 1200 + i * 200);
  });
  labels.forEach((label, i) => {
    label.classList.remove('animated');
    setTimeout(() => {
      label.classList.add('animated');
    }, 1400 + i * 200);
  });
}

function animatePinRadius(pin, start, end, duration) {
  const startTime = performance.now();
  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const c1 = 1.70158, c3 = c1 + 1;
    const eased = 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2);
    pin.setAttribute('r', start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function animateRouteLine(line, duration) {
  const length = line.getTotalLength();
  line.style.strokeDasharray = length;
  line.style.strokeDashoffset = length;
  line.style.transition = 'none';
  void line.offsetWidth;
  line.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
  line.style.strokeDashoffset = '0';

  // After animation, restore dashed pattern
  setTimeout(() => {
    line.style.transition = 'none';
    line.style.strokeDasharray = '10, 5';
    line.style.strokeDashoffset = '0';
  }, duration + 50);
}

// Fixed function to animate individual map elements
function animateMapElements() {
    
    // Animate route lines with proper drawing effect that restores dashed pattern
    const routeLines = document.querySelectorAll('.route-line');
    routeLines.forEach((line, index) => {
        // Get the total length of the line for animation
        const length = line.getTotalLength();
        
        // Set up the line for drawing animation
        line.style.strokeDasharray = `${length} ${length}`;
        line.style.strokeDashoffset = length;
        line.style.opacity = '0.7';
        
        // Animate the line drawing with staggered timing
        setTimeout(() => {
            line.style.transition = 'stroke-dashoffset 1.2s ease-in-out';
            line.style.strokeDashoffset = '0';
            
            // After drawing animation completes, restore dashed pattern
            setTimeout(() => {
                line.style.strokeDasharray = '10, 5'; // Restore dashed pattern
                line.style.strokeDashoffset = '0'; // Keep line visible
            }, 1300); // Wait for drawing animation to complete
            
        }, index * 300); // Stagger each line by 300ms
    });

    // Animate pins with scale and opacity (SVG-friendly approach)
    const pins = document.querySelectorAll('.location-pin');
    pins.forEach((pin, index) => {
        // Set initial state - start with radius 0 and invisible
        pin.setAttribute('r', '0');
        pin.style.opacity = '0';
        
        // Animate pins to full size with staggered timing
        setTimeout(() => {
            // Animate radius using SVG attribute animation
            pin.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            pin.style.opacity = '1';
            
            // Animate radius with a custom function for smooth SVG animation
            animatePinRadius(pin, 0, 8, 600); // From 0 to 8 over 600ms
            
        }, 1200 + (index * 200)); // Start after routes, stagger by 200ms
    });

    // Animate pin labels with fade-in effect
    const pinLabels = document.querySelectorAll('.pin-label');
    pinLabels.forEach((label, index) => {
        // Animate labels to visible with staggered timing
        setTimeout(() => {
            label.style.opacity = '0.8'; // Fade in to semi-transparent
        }, 1400 + (index * 200)); // Start after pins, stagger by 200ms
    });
}

// Animate SVG circle radius
function animatePinRadius(pin, start, end, duration) {
  const startTime = performance.now();
  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing for a little bounce
    const c1 = 1.70158, c3 = c1 + 1;
    const eased = 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2);
    pin.setAttribute('r', start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// Easing function for bouncy pin animation
function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

// Utility Functions

// Function to handle responsive behavior
function handleResize() {
    // Adjust map scaling on window resize if needed
    const mapContainer = document.querySelector('.map-container');
    const windowWidth = window.innerWidth;

    // Add responsive classes based on screen size
    if (windowWidth < 768) {
        mapContainer.classList.add('mobile-view'); // Add mobile class
    } else {
        mapContainer.classList.remove('mobile-view'); // Remove mobile class
    }
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// Call resize handler on initial load
handleResize();

// Function to preload images for better performance (optional)
function preloadImages() {
    const imageUrls = [
        'https://via.placeholder.com/400x300/7c5fd3/ffff?text=Placeholder+Image+1',
        'https://via.placeholder.com/400x300/bfaaff/ffff?text=Placeholder+Image+2',
        'https://via.placeholder.com/400x300/e6e6fa/7c5fd3?text=Placeholder+Image+3'
    ];

    // Create image objects to preload
    imageUrls.forEach(url => {
        const img = new Image(); // Create new image object
        img.src = url; // Set source to preload
    });
}

// Preload images on page load
preloadImages();

// Console log for debugging
console.log('Work Journey page loaded successfully!');


