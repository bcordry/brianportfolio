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

// Purple snow effect function - Updated for subtle dots
function createSnowEffect() {
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return; // Exit if container doesn't exist
  
  const SNOW_DOT_COUNT = 0; // Reduced from 40 for subtlety
  const snowDots = []; // Store snow dot elements
  
  // Create initial batch of snow dots
  for (let i = 0; i < SNOW_DOT_COUNT; i++) {
    setTimeout(() => createSnowDot(), i * 120); // Slightly slower stagger
  }
  
  // Continue creating snow dots at intervals
  setInterval(createSnowDot, 400); // Less frequent creation
  
  function createSnowDot() {
    const dot = document.createElement('div');
    dot.className = 'snow-dot'; // New CSS class for dots
    
    // Random horizontal position
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.top = -5 + 'vh'; // Start above viewport
    
    // Random animation duration (longer = slower)
    dot.dataset.duration = 16 + Math.random() * 6; // 8-14 seconds
    
    // Random horizontal drift
    dot.dataset.drift = (Math.random() - 0.5) * 1.5; // -0.75 to 0.75
    
    snowContainer.appendChild(dot);
    snowDots.push(dot);
    
    // Remove dot after animation completes
    setTimeout(() => {
      if (dot.parentNode) {
        dot.parentNode.removeChild(dot);
      }
    }, 10000); // Remove after 16 seconds
  }
  
  // Animate snow dots
  function animateSnow() {
    snowDots.forEach(dot => {
      if (!dot.parentNode) return; // Skip if removed
      
      // Get current positions
      let top = parseFloat(dot.style.top) || -5;
      let left = parseFloat(dot.style.left) || 0;
      
      // Move down based on duration
      top += 0.4 * (14 / parseFloat(dot.dataset.duration)); // Adjust speed
      
      // Drift horizontally
      left += parseFloat(dot.dataset.drift) * 0.08;
      
      // Update positions
      dot.style.top = top + 'vh';
      dot.style.left = left + 'vw';
      
      // If below viewport, reset to top
      if (top > 105) {
        dot.style.top = -5 + 'vh';
        dot.style.left = Math.random() * 100 + 'vw';
      }
    });
    requestAnimationFrame(animateSnow);
  }
  animateSnow();
}