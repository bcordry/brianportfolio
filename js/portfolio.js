// portfolio.js

// Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // Initialize snow effect (reuse from your existing system)
  createSnowEffect();

  // Initialize parallax background with mouse movement
  initializeParallaxBackground();

  // Initialize filtering functionality
  initializeFiltering();

  // Initialize modal functionality
  initializeModal();

  // Initialize card click handlers with project data
  initializeCardClickHandlers();
});

// Snow effect function (copied from index.js for consistency)
function createSnowEffect() {
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return;
  
  // Array of snowflake characters
  const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❋'];
  
  // Create initial batch of snowflakes
  for (let i = 0; i < 40; i++) {
    setTimeout(() => createSnowflake(), i * 80);
  }
  
  // Continue creating snowflakes at intervals
  setInterval(createSnowflake, 250);
  
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    
    // Random horizontal position
    snowflake.style.left = Math.random() * 100 + 'vw';
    
    // Random size (bigger snowflakes)
    snowflake.style.fontSize = (Math.random() * 1.8 + 1.2) + 'em';
    
    // Random fall duration
    snowflake.style.animationDuration = (Math.random() * 6 + 6) + 's';
    snowflake.style.animationDelay = '0s';
    
    // Random opacity (more opaque)
    snowflake.style.opacity = Math.random() * 0.4 + 0.7;
    
    // Add to container
    snowContainer.appendChild(snowflake);
    
    // Remove after animation completes
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
      }
    }, 14000);
  }
}

// Initialize parallax background with mouse movement
function initializeParallaxBackground() {
  const parallaxBg = document.getElementById('parallax-bg');
  if (!parallaxBg) return;
  
  // Create SVG with floating shapes for depth
  parallaxBg.innerHTML = `
    <svg width="100vw" height="100vh" viewBox="0 0 1920 1080" style="position:absolute;top:0;left:0;">
      <!-- Floating ellipse 1 -->
      <ellipse id="parallax-shape-1" cx="400" cy="200" rx="180" ry="80" 
               fill="rgba(191, 170, 255, 0.08)" opacity="0.6"/>
      
      <!-- Floating ellipse 2 -->
      <ellipse id="parallax-shape-2" cx="1600" cy="800" rx="220" ry="100" 
               fill="rgba(124, 95, 211, 0.06)" opacity="0.5"/>
      
      <!-- Floating ellipse 3 -->
      <ellipse id="parallax-shape-3" cx="900" cy="500" rx="300" ry="120" 
               fill="rgba(230, 230, 250, 0.08)" opacity="0.7"/>
      
      <!-- Additional smaller shapes for more depth -->
      <circle id="parallax-shape-4" cx="300" cy="600" r="60" 
              fill="rgba(191, 170, 255, 0.05)" opacity="0.4"/>
      
      <circle id="parallax-shape-5" cx="1400" cy="300" r="80" 
              fill="rgba(124, 95, 211, 0.04)" opacity="0.3"/>
    </svg>
  `;
  
  // Get references to shapes for animation
  const shape1 = parallaxBg.querySelector('#parallax-shape-1');
  const shape2 = parallaxBg.querySelector('#parallax-shape-2');
  const shape3 = parallaxBg.querySelector('#parallax-shape-3');
  const shape4 = parallaxBg.querySelector('#parallax-shape-4');
  const shape5 = parallaxBg.querySelector('#parallax-shape-5');
  
  // Mouse parallax effect - shapes move at different speeds
  document.addEventListener('mousemove', function(e) {
    // Get mouse position as percentage of screen
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Move shapes at different speeds and directions for depth
    if (shape1) {
      shape1.setAttribute('cx', 400 + (x - 0.5) * 120); // Slow horizontal movement
      shape1.setAttribute('cy', 200 + (y - 0.5) * 60);  // Slow vertical movement
    }
    
    if (shape2) {
      shape2.setAttribute('cx', 1600 - (x - 0.5) * 100); // Opposite direction
      shape2.setAttribute('cy', 800 - (y - 0.5) * 80);
    }
    
    if (shape3) {
      shape3.setAttribute('cx', 900 + (x - 0.5) * 200); // Faster movement
      shape3.setAttribute('cy', 500 + (y - 0.5) * 100);
    }
    
    if (shape4) {
      shape4.setAttribute('cx', 300 + (x - 0.5) * 80);  // Small movement
      shape4.setAttribute('cy', 600 + (y - 0.5) * 40);
    }
    
    if (shape5) {
      shape5.setAttribute('cx', 1400 - (x - 0.5) * 90); // Opposite direction
      shape5.setAttribute('cy', 300 - (y - 0.5) * 50);
    }
  });
}

// Initialize filtering functionality
function initializeFiltering() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.portfolio-card');
  
  // Add click handlers to filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', function () {
      // Remove active class from all pills
      filterPills.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked pill
      this.classList.add('active');
      
      // Get filter type
      const filter = this.getAttribute('data-filter');
      
      // Filter cards with smooth animation
      cards.forEach((card, index) => {
        const type = card.getAttribute('data-type');
        
        if (filter === 'all' || type === filter) {
          // Show card
          card.style.display = 'flex';
          
          // Animate in with staggered timing
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, index * 50); // Stagger animation
          
        } else {
          // Hide card with animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          
          // Hide after animation completes
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize modal functionality
function initializeModal() {
  const modal = document.getElementById('portfolio-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.querySelector('.modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  
  // Function to close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    modalTitle.textContent = '';
    modalBody.innerHTML = '';
  }
  
  // Close modal when clicking close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking backdrop
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Initialize card click handlers with project data
function initializeCardClickHandlers() {
  // Project data for modal content
  const projectData = {
    'EGL Website': {
      description: 'A redesign and frontend development project for EGL\'s competitive gaming platform. Built with modern web technologies to create an engaging user experience for gamers.',
      tech: 'HTML5, CSS3, JavaScript, Responsive Design',
      year: '2024',
      link: null
    },
    'Winterfox Redesign': {
      description: 'A full redesign of an esports organization website. I collaborated on visual design and layout, helping the brand look cleaner and more professional.',
      tech: 'Web Design, UI/UX, Frontend Development',
      year: '2016',
      link: null
    },
    'Emerald Imperium': {
      description: 'A website created from scratch in HTML and JS for the Pokemon ROM Hack "Emerald Imperium". Features include game information, download links, and community features.',
      tech: 'HTML, CSS, JavaScript, Game Integration',
      year: '2025',
      link: 'https://emeraldimperium.info/'
    },
    'Terra Emerald': {
      description: 'A detailed website created for the Pokemon ROM Hack "Terra Emerald". Many advanced features including interactive maps, character databases, and community tools.',
      tech: 'Advanced JavaScript, Database Integration, Interactive Features',
      year: '2025',
      link: 'http://google.com'
    },
    'LeBlanc Solutions': {
      description: 'LeBlanc Solutions - A professional website for a local businesswoman offering Notary services & Private Bartending work. Clean, professional design focused on service offerings and up-front pricing.',
      tech: 'HTML, CSS, JavaScript, Design Consultation, Brand Direction',
      year: '2025',
      link: 'http://leblancsolutions.com'
    },
    'Spire Records': {
      description: 'Record-keeping website for Slay The Spire. Allows players to track their runs, statistics, and progress through the game.',
      tech: 'Data Management, Game Integration, Statistics Tracking',
      year: '2024',
      link: null
    },
    'Local Restaurant': {
      description: 'Website for a local restaurant. Details coming soon as project is in development.',
      tech: 'Restaurant Website, Menu Management, Online Presence',
      year: '2025',
      link: null
    },
    'Winterfox Pride': {
      description: 'Online documentary series (2016-2018) showcasing the esports organization Winterfox. Produced and edited video content for web distribution.',
      tech: 'Video Production, Web Video, Documentary Series',
      year: '2015-2016',
      link: null,
      videoId: '9qYg6q41_4E' // Replace with actual YouTube video ID
    },
    'Winterfox Aspire': {
      description: 'Second series in the Winterfox documentary collection. Continued coverage of the esports organization with improved production values.',
      tech: 'Advanced Video Production, Series Production, Esports Coverage',
      year: '2016',
      link: null,
      videoId: 'mzI0th7-GDo' // Replace with actual YouTube video ID
    },
    'Nuzlocke Hall of Fame': {
      description: 'Created and currently maintaining a Hall of Fame for the Pokemon difficulty ROM Hack Nuzlocke community. This project exhaustively tracks and showcases notable achievements in the most difficult Nuzlocke games. This Hall of Fame has garnered over 1,000,000 views and is a central hub for the Nuzlocke community.',
      tech: 'Microsoft Excel, VBA',
      year: '2024-present',
      link: 'https://docs.google.com/spreadsheets/d/1l9Vmohnlkz8KgHIFEzCQ2UK5-PRGT16dNDYnsJgrH7A/edit?gid=1916946302#gid=1916946302'
    },
    'Team Leadership': {
      description: 'Various team leadership roles in development projects, coordinating cross-functional teams and ensuring project delivery.',
      tech: 'Project Management, Team Coordination, Agile Development',
      year: '2023-2025',
      link: null
    },
    'Project Lead': {
      description: 'Led multiple web development projects from conception to deployment, managing timelines, resources, and stakeholder communication.',
      tech: 'Project Leadership, Full-Stack Development, Client Management',
      year: '2023-2025',
      link: null
    }
  };
  
  // Add click handlers to all portfolio cards
  document.querySelectorAll('.portfolio-card').forEach((card) => {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Get project information
      const titleElement = card.querySelector('.card-title');
      const imgElement = card.querySelector('.card-img');
      const isVideo = card.dataset.type === 'video';
      const videoId = imgElement?.dataset?.videoId; // Get video ID from data attribute
      
      if (!titleElement || !imgElement) return;
      
      const title = titleElement.textContent;
      const imgSrc = imgElement.src;
      const project = projectData[title];
      
      // Populate modal
      const modal = document.getElementById('portfolio-modal');
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');
      
      modalTitle.textContent = title;
      
      // Build modal content - handle video vs image
      let modalContent = '';
      
      if (isVideo && (videoId || project?.videoId)) {
        // Use video ID from data attribute or project data
        const actualVideoId = videoId || project.videoId;
        modalContent += `
          <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 18px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(191,170,255,0.3);">
            <iframe 
              src="https://www.youtube.com/embed/${actualVideoId}?autoplay=1&rel=0" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
      } else {
        // Regular image
        modalContent += `
          <img src="${imgSrc}" alt="${title}" style="width:100%; border-radius:12px; margin:18px 0; box-shadow: 0 4px 16px rgba(191,170,255,0.3);">
        `;
      }
      
      if (project) {
        modalContent += `
          <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">${project.description}</p>
          
          <div style="background: rgba(191,170,255,0.1); padding: 16px; border-radius: 12px; margin: 16px 0;">
            <h4 style="margin: 0 0 8px 0; color: #7c5fd3; font-family: 'Ysabeau SC', sans-serif;">Technologies Used:</h4>
            <p style="margin: 0; font-weight: 500;">${project.tech}</p>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
            <span style="color: #6a4c93; font-weight: 500;">Year: ${project.year}</span>
            ${project.link ? `<a href="${project.link}" target="_blank" style="background: linear-gradient(90deg, #7c5fd3, #bfaaff); color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: 500;">Visit Website</a>` : ''}
          </div>
        `;
      } else {
        modalContent += `<p>More details coming soon...</p>`;
      }
      
      modalBody.innerHTML = modalContent;
      
      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });
}