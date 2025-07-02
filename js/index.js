// index.js

document.addEventListener('DOMContentLoaded', () => {
  createSnowEffect();

  const polys = [
    document.getElementById('poly1'),
    document.getElementById('poly2'),
    document.getElementById('poly3'),
    document.getElementById('poly4'),
    document.getElementById('poly5'),
    document.getElementById('poly6')
  ];

  polys.forEach((poly, i) => {
    if (poly) {
      setTimeout(() => {
        poly.classList.add('glass-animate');
        // All polygons shimmer, more frequently and more prominent
        poly.classList.add('shimmer-active');
      }, 200 + i * 200);
    }
  });

  // Fade in portrait image
  setTimeout(() => {
    const portrait = document.getElementById('portrait-img');
    if (portrait) portrait.style.opacity = '1';
  }, 1800);

  // Show title and subtitle
  setTimeout(() => {
    const title = document.querySelector('.title');
    if (title) title.classList.add('show-title');
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) subtitle.classList.add('show-title');
    // Fade in all labels at the same time as title/subtitle
    document.querySelectorAll('.poly-label').forEach(label => {
      label.classList.add('visible');
    });
  }, 2200);

  // Add click handlers and hover effects to clickable polygons
  const clickablePolys = document.querySelectorAll('.clickable-poly');
  clickablePolys.forEach((poly, index) => {
    const targetPage = poly.getAttribute('data-page');
    const sectionTitle = poly.getAttribute('data-title');
    poly.addEventListener('click', (e) => {
      poly.style.transform = 'scale(0.95)';
      setTimeout(() => {
        poly.style.transform = '';
      }, 150);
      if (targetPage) {
        alert(`Navigating to: ${sectionTitle}\nPage: ${targetPage}`);
        // window.location.href = targetPage;
      }
    });
    // Label hover logic
    const labelId = `label${index + 1}`;
    const label = document.getElementById(labelId);
    poly.addEventListener('mouseenter', () => {
      if (label) label.classList.add('active');
    });
    poly.addEventListener('mouseleave', () => {
      if (label) label.classList.remove('active');
    });
  });
});

// Purple snow effect
function createSnowEffect() {
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return;
  const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❋'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => createSnowflake(), i * 80);
  }
  setInterval(createSnowflake, 250);
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = (Math.random() * 1.8 + 1.2) + 'em';  // ← Bigger snowflakes (1.2em to 3em)
    snowflake.style.animationDuration = (Math.random() * 6 + 6) + 's';
    snowflake.style.animationDelay = '0s';
    snowflake.style.opacity = Math.random() * 0.4 + 0.7;            // ← More opaque (0.7 to 1.1)
    snowContainer.appendChild(snowflake);
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
      }
    }, 14000);
  }
}