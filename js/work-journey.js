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
    initTimeline(); // Initialize the new timeline

});

// Snow Effect - Updated for subtle dots
function initSnowEffect() {
    const snowContainer = document.getElementById('snow-container'); // Get snow container element
    const maxSnowflakes = 15; // Reduced from 50

    // Function to create a single snow dot
    function createSnowflake() {
        const snowflake = document.createElement('div'); // Create div element for snowflake
        snowflake.className = 'snow-dot'; // Changed to snow-dot CSS class

        // Set random horizontal position across screen width
        snowflake.style.left = Math.random() * 100 + 'vw';

        // Set random animation duration between 6-12 seconds
        snowflake.style.animationDuration = (Math.random() * 6 + 6) + 's';

        // Set random delay before animation starts (0-2 seconds)
        snowflake.style.animationDelay = Math.random() * 2 + 's';

        // Set random opacity between 0.5 and 0.8 (more subtle)
        snowflake.style.opacity = Math.random() * 0.3 + 0.5;

        // Add snowflake to container
        snowContainer.appendChild(snowflake);

        // Remove snowflake after animation completes to prevent memory leaks
        setTimeout(() => {
            if (snowflake.parentNode) { // Check if element still exists
                snowflake.parentNode.removeChild(snowflake); // Remove from DOM
            }
        }, 14000); // Remove after 14 seconds (max animation duration)
    }

    // Create initial batch of snowflakes
    for (let i = 0; i < maxSnowflakes; i++) {
        setTimeout(createSnowflake, i * 200); // Stagger creation by 200ms each
    }

    // Continue creating snowflakes at intervals
    setInterval(createSnowflake, 600); // Create new snowflake every 600ms
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
                "assets/images/portraits/winterfox-victory-shot.jpg",
                //"assets/images/portraits/winterfox-full-team-outside.jpg",
                "assets/images/portraits/winterfox-crowd-shot.jpg",
            ]
        },
        'las-vegas': {
            role: 'Esports Manager',
            company: 'Vie.gg - Esports Betting Platform',
            duration: '2017-2018',
            description: 'One of first five employees at a startup esports betting platform. Developed and executed esports strategy, including partnerships with teams and leagues, content creation, and community engagement. Played a key role in launching the platform and establishing its presence in the esports industry.',
            images: [
                "assets/images/portraits/gamescom-vie-backdrop-cropped.jpg",
                "assets/images/portraits/hcs-indianapolis.jpeg"                
            ]
        },
        'denver': {
            role: 'Project Manager',
            company: 'Esports Entertainment Group, EGL, South Suburban Parks and Recreation Esports',
            duration: '2019-present',
            description: 'Managed multiple projects including website development, community engagement initiatives, and esports events. Traveled nation-wide to oversee events and manage logistics. Played a key role in expanding the company\'s reach in the esports industry, particularly in partnerships with traditional sports teams.',
            images: [
                "assets/images/portraits/summershowdown-execproducer.jpeg",
                "assets/images/portraits/hub-showcase-full-lan-cropped.jpg",
                "assets/images/portraits/philly-union-event-winners.jpeg",
                "assets/images/portraits/hub-randomlan.jpeg"                
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
                "assets/images/portraits/winterfox-chicago-office-2.jpg",
                "assets/images/portraits/winterfox-chicago-office-alternate-cropped.jpg"
            ]
        },
        'jolly-harbour': {
            role: 'Head of Esports',
            company: 'Esports Entertainment Group',
            duration: '2018-2019',
            description: 'Worked internationally and managed the local office in Jolly Harbour, Antigua. Focused on esports strategy, website development, and community engagement for the upstart company. Developed and executed successful esports campaigns, helping the company eventually IPO in 2020. <I know Antigua is further south and not this big! Forgive me, I just wanted to include within the bounds of the map.>',
            images: [
                "assets/images/portraits/antigua-flyby.jpeg",
                "assets/images/portraits/broncos-signing-eeg2.jpeg"
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


// Timeline functionality - integrates with existing modal system
function initTimeline() {
    // Timeline configuration
    const timelineStart = 2010; // Start year (will be offscreen)
    const timelineEnd = 2025; // End year
    const majorTickInterval = 5; // Major ticks every 5 years
    
    // Your career locations with years - matching your existing location data
    const timelineLocations = [
        {
            location: 'los-angeles', // Matches your existing data-location
            city: 'Los Angeles',
            state: 'California',
            year: 2013,
            startYear: 2013,
            endYear: 2016
        },
        {
            location: 'chicago',
            city: 'Chicago', 
            state: 'Illinois',
            year: 2015,
            startYear: 2015,
            endYear: 2017
        },
        {
            location: 'las-vegas',
            city: 'Las Vegas',
            state: 'Nevada', 
            year: 2017,
            startYear: 2017,
            endYear: 2018
        },
        {
            location: 'jolly-harbour',
            city: 'Jolly Harbour',
            state: 'Antigua',
            year: 2018,
            startYear: 2018,
            endYear: 2019
        },
        {
            location: 'denver',
            city: 'Denver',
            state: 'Colorado',
            year: 2019,
            startYear: 2019,
            endYear: 2024
        }
    ];
    
    // Get timeline track element
    const timelineTrack = document.getElementById('timeline-track');
    if (!timelineTrack) return; // Exit if timeline not found
    
    // Clear any existing content
    timelineTrack.innerHTML = '';
    
    // Calculate timeline dimensions
    const totalYears = timelineEnd - timelineStart; // Total span of years
    const trackWidth = timelineTrack.offsetWidth; // Get actual track width
    
    // Helper function to get X position for a given year
    function getXPosition(year) {
        const yearProgress = (year - timelineStart) / totalYears; // Progress from 0 to 1
        return yearProgress * trackWidth; // Convert to pixel position
    }
    
    // Create major year ticks and labels (2010, 2015, 2020, 2025)
    for (let year = timelineStart; year <= timelineEnd; year += majorTickInterval) {
        const x = getXPosition(year); // Get X position for this year
        
        // Create major tick mark
        const majorTick = document.createElement('div');
        majorTick.className = 'timeline-tick major'; // CSS class for styling
        majorTick.style.left = `${x}px`; // Position horizontally
        timelineTrack.appendChild(majorTick); // Add to timeline
        
        // Create major year label
        const majorLabel = document.createElement('div');
        majorLabel.className = 'timeline-year-label major'; // CSS class for styling
        majorLabel.textContent = year; // Display the year
        majorLabel.style.left = `${x}px`; // Position horizontally
        timelineTrack.appendChild(majorLabel); // Add to timeline
    }
    
    // Create minor year ticks and labels (years in between major ticks)
    for (let year = timelineStart + 1; year < timelineEnd; year++) {
        // Skip years that are major ticks
        if ((year - timelineStart) % majorTickInterval === 0) continue;
        
        const x = getXPosition(year); // Get X position for this year
        
        // Create minor tick mark
        const minorTick = document.createElement('div');
        minorTick.className = 'timeline-tick minor'; // CSS class for styling
        minorTick.style.left = `${x}px`; // Position horizontally
        timelineTrack.appendChild(minorTick); // Add to timeline
        
        // Create minor year label (show every year)
        const minorLabel = document.createElement('div');
        minorLabel.className = 'timeline-year-label minor';
        minorLabel.textContent = year;
        minorLabel.style.left = `${x}px`;
        timelineTrack.appendChild(minorLabel);
    }
    
    // Create location dots for each career location
    timelineLocations.forEach(locationData => {
        const x = getXPosition(locationData.year); // Get X position for this location's year
        
        // Create location dot (matching your map pin style)
        const locationDot = document.createElement('div');
        locationDot.className = 'timeline-location-dot'; // CSS class for styling
        locationDot.style.left = `${x}px`; // Position horizontally
        
        // Add data attributes for modal integration (same as your map)
        locationDot.setAttribute('data-location', locationData.location);
        locationDot.setAttribute('data-city', locationData.city);
        locationDot.setAttribute('data-state', locationData.state);
        
        // Add accessibility attributes
        locationDot.setAttribute('tabindex', '0'); // Make focusable
        locationDot.setAttribute('role', 'button'); // Screen reader role
        locationDot.setAttribute('aria-label', `View details for ${locationData.city}, ${locationData.state} (${locationData.startYear}-${locationData.endYear})`);
        
        // Add click event listener - reuse your existing modal function
        locationDot.addEventListener('click', function() {
            // Call your existing modal function with the same parameters
            openLocationModal(locationData.location, locationData.city, locationData.state);
        });
        
        // Add keyboard event listener for accessibility
        locationDot.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') { // Enter or Space key
                event.preventDefault(); // Prevent default behavior
                // Call your existing modal function
                openLocationModal(locationData.location, locationData.city, locationData.state);
            }
        });
        
        // Add dot to timeline
        timelineTrack.appendChild(locationDot);
        
        // Create location label (shows on hover)
        const locationLabel = document.createElement('div');
        locationLabel.className = 'timeline-location-label'; // CSS class for styling
        locationLabel.textContent = `${locationData.city}\n${locationData.startYear}-${locationData.endYear}`; // City name and years
        locationLabel.style.left = `${x}px`; // Position horizontally
        timelineTrack.appendChild(locationLabel); // Add to timeline
    });
    
    // Add timeline animation on load
    setTimeout(() => {
        animateTimelineElements(); // Call animation function after a delay
    }, 2000); // Wait 2 seconds after page load
}

// Animate timeline elements on load
function animateTimelineElements() {
    const timelineDots = document.querySelectorAll('.timeline-location-dot'); // Get all location dots
    
    // Animate each dot with staggered timing
    timelineDots.forEach((dot, index) => {
        // Start dots invisible and small
        dot.style.opacity = '0'; // Invisible
        dot.style.transform = 'translate(-50%, -50%) scale(0)'; // Small and centered
        
        // Animate to visible and normal size with delay
        setTimeout(() => {
            dot.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Smooth transitions
            dot.style.opacity = '1'; // Fade in
            dot.style.transform = 'translate(-50%, -50%) scale(1)'; // Scale to normal size
        }, index * 200); // Stagger by 200ms per dot
    });
}