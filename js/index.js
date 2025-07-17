// index.js - Updated to navigate to actual pages instead of showing popups

document.addEventListener('DOMContentLoaded', () => {
  createSnowEffect(); // Initialize the purple snow effect

  // Get all polygon elements for animation
  const polys = [
    document.getElementById('poly1'),
    document.getElementById('poly2'),
    document.getElementById('poly3'),
    document.getElementById('poly4'),
    document.getElementById('poly5'),
    document.getElementById('poly6')
  ];

  // Animate each polygon with staggered timing
  polys.forEach((poly, i) => {
    if (poly) {
      setTimeout(() => {
        poly.classList.add('glass-animate'); // Add glass animation effect
        poly.classList.add('shimmer-active'); // Add shimmer effect for all polygons
      }, 200 + i * 200); // Stagger animation by 200ms per polygon
    }
  });

  // Fade in portrait image after polygons animate
  setTimeout(() => {
    const portrait = document.getElementById('portrait-img');
    if (portrait) portrait.style.opacity = '1'; // Make portrait visible
  }, 1800);

  // Show title and subtitle with labels
  setTimeout(() => {
    const title = document.querySelector('.title');
    if (title) title.classList.add('show-title'); // Animate title in
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) subtitle.classList.add('show-title'); // Animate subtitle in
    // Fade in all labels at the same time as title/subtitle
    document.querySelectorAll('.poly-label').forEach(label => {
      label.classList.add('visible'); // Make labels visible
    });
  }, 2200);

  // Add click handlers and hover effects to clickable polygons
  const clickablePolys = document.querySelectorAll('.clickable-poly');
  clickablePolys.forEach((poly, index) => {
    const targetPage = poly.getAttribute('data-page'); // Get target page from data attribute
    const sectionTitle = poly.getAttribute('data-title'); // Get section title for feedback
    
    poly.addEventListener('click', (e) => {
      // Add click animation - scale down briefly
      poly.style.transform = 'scale(0.95)';
      setTimeout(() => {
        poly.style.transform = ''; // Reset transform
      }, 150);
      
      // Navigate to the target page if it exists
      if (targetPage) {
        // Add a brief delay for the click animation to complete
        setTimeout(() => {
          window.location.href = targetPage; // Navigate to the actual page
        }, 200);
      }
    });
    
    // Label hover logic - highlight labels when hovering over polygons
    const labelId = `label${index + 1}`;
    const label = document.getElementById(labelId);
    poly.addEventListener('mouseenter', () => {
      if (label) label.classList.add('active'); // Highlight label on hover
    });
    poly.addEventListener('mouseleave', () => {
      if (label) label.classList.remove('active'); // Remove highlight when not hovering
    });
  });
});

// Purple snow effect function
function createSnowEffect() {
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return; // Exit if container doesn't exist
  
  const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❋']; // Different snowflake characters
  
  // Create initial batch of snowflakes
  for (let i = 0; i < 40; i++) {
    setTimeout(() => createSnowflake(), i * 80); // Stagger initial snowflakes
  }
  
  // Continue creating snowflakes at regular intervals
  setInterval(createSnowflake, 250);
  
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake'; // Apply snowflake CSS class
    snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)]; // Random character
    snowflake.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    snowflake.style.fontSize = (Math.random() * 1.8 + 1.2) + 'em'; // Random size (1.2em to 3em)
    snowflake.style.animationDuration = (Math.random() * 6 + 6) + 's'; // Random fall speed (6-12s)
    snowflake.style.animationDelay = '0s'; // Start immediately
    snowflake.style.opacity = Math.random() * 0.4 + 0.7; // Random opacity (0.7 to 1.1)
    snowContainer.appendChild(snowflake); // Add to container
    
    // Remove snowflake after animation completes to prevent memory leaks
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
      }
    }, 12000); // Remove after 14 seconds
  }
}