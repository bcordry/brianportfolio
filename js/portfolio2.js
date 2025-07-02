// portfolio.js

// Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // Snow effect (copied from index.js for consistency)
  createSnowEffect();

  // Filtering logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      cards.forEach(card => {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Modal logic
  const modal = document.getElementById('portfolio-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.querySelector('.modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');

  // Open modal on "View Details"
  document.querySelectorAll('.view-details-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = btn.closest('.portfolio-card');
      const title = card.querySelector('.card-title').textContent;
      const desc = card.querySelector('.card-desc').textContent;
      const imgSrc = card.querySelector('.card-img').src;
      // Optionally, add more info per project here
      let extraContent = '';
      if (title.includes('Emerald Imperium')) {
        extraContent = `<a href="https://emeraldimperium.info/" target="_blank" style="color:#7c5fd3;text-decoration:underline;">Visit Emerald Imperium Website</a>`;
      }
      modalTitle.textContent = title;
      modalBody.innerHTML = `
        <img src="${imgSrc}" alt="${title}" style="width:100%;border-radius:12px;margin:18px 0;">
        <p>${desc}</p>
        ${extraContent}
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal logic
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalTitle.textContent = '';
    modalBody.innerHTML = '';
  }
  closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Snow effect function (copied from index.js)
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
      snowflake.style.fontSize = (Math.random() * 1.8 + 1.2) + 'em';
      snowflake.style.animationDuration = (Math.random() * 6 + 6) + 's';
      snowflake.style.animationDelay = '0s';
      snowflake.style.opacity = Math.random() * 0.4 + 0.7;
      snowContainer.appendChild(snowflake);
      setTimeout(() => {
        if (snowflake.parentNode) {
          snowflake.parentNode.removeChild(snowflake);
        }
      }, 14000);
    }
  }
});