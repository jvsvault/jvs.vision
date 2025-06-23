/**
 * JVS Vision - Photography Portfolio
 * Professional photographer portfolio with masonry layout
 */

// Gallery configuration based on folder structure
const galleryConfig = {
  images: [
    // Abstract folder
    { filename: 'abstract/r001-004.jpg', category: 'abstract', title: 'Abstract Study #1' },
    { filename: 'abstract/r001-005.jpg', category: 'abstract', title: 'Abstract Study #2' },
    { filename: 'abstract/r001-012.jpg', category: 'abstract', title: 'Abstract Study #3' },
    { filename: 'abstract/r001-013.jpg', category: 'abstract', title: 'Abstract Study #4' },
    { filename: 'abstract/r001-021 2.jpg', category: 'abstract', title: 'Abstract Study #5' },
    
    // Landscape folder
    { filename: 'landscape/00420020.JPG', category: 'landscape', title: 'Landscape #1' },
    { filename: 'landscape/r001-018.jpg', category: 'landscape', title: 'Landscape #2' },
    { filename: 'landscape/r001-020.jpg', category: 'landscape', title: 'Landscape #3' },
    
    // Portrait folder
    { filename: 'portrait/R1-02565-022A.JPG', category: 'portrait', title: 'Portrait #1' },
    { filename: 'portrait/r001-025.jpg', category: 'portrait', title: 'Portrait #2' }
  ],
  categories: ['ALL', 'ABSTRACT', 'LANDSCAPE', 'PORTRAIT']
};

// State
let currentFilter = 'ALL';
let currentImageIndex = 0;
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  initializeNavigation();
  // initializeScrollBehavior(); // Removed header hiding on scroll
  initializeLightbox();
  updateYear();
  
  // Check initial hash
  const hash = window.location.hash.slice(1);
  const section = hash || 'gallery';
  navigateToSection(section);
}

// Navigation
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      navigateToSection(section);
    });
  });
  
  window.addEventListener('popstate', (e) => {
    const section = e.state?.section || 'gallery';
    navigateToSection(section, false);
  });
}

function navigateToSection(section, pushState = true) {
  currentFilter = 'ALL'; // Reset filter when navigating
  
  // Update URL
  if (pushState) {
    history.pushState({ section }, '', `#${section}`);
  }
  
  // Update navigation
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === section);
  });
  
  // Update title
  const titles = {
    gallery: 'Gallery | JVS Vision',
    about: 'About | JVS Vision',
    contact: 'Contact | JVS Vision'
  };
  document.title = titles[section] || 'JVS Vision';
  
  // Render content
  const content = document.getElementById('dynamic-content');
  
  switch(section) {
    case 'gallery':
      renderGallery(content);
      break;
    case 'about':
      renderAbout(content);
      break;
    case 'contact':
      renderContact(content);
      break;
    default:
      renderGallery(content);
  }
}

// Gallery with filter
function renderGallery(container) {
  container.innerHTML = `
    <div class="gallery-section">
      <div class="filter-nav">
        ${galleryConfig.categories.map(cat => `
          <button class="${cat === currentFilter ? 'active' : ''}" data-category="${cat}">
            ${cat}
          </button>
        `).join('')}
      </div>
      <div class="gallery gallery-entrance" id="gallery-container">
        ${renderGalleryItems()}
      </div>
    </div>
  `;
  
  // Add filter functionality
  const filterButtons = container.querySelectorAll('.filter-nav button');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-category');
      filterGallery();
      
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  // Initialize gallery items
  initializeGalleryItems();
}

function renderGalleryItems() {
  const filteredImages = currentFilter === 'ALL' 
    ? galleryConfig.images 
    : galleryConfig.images.filter(img => img.category === currentFilter.toLowerCase());
    
  return filteredImages.map((image, index) => `
    <div class="gallery-item loading" 
         data-index="${galleryConfig.images.indexOf(image)}" 
         data-category="${image.category}"
         data-number="${String(index + 1).padStart(2, '0')}">
      <img src="/assets/gallery/${image.filename}" 
           alt="${image.title}" 
           loading="lazy">
    </div>
  `).join('');
}

function filterGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.classList.remove('gallery-entrance');
  
  setTimeout(() => {
    galleryContainer.innerHTML = renderGalleryItems();
    galleryContainer.classList.add('gallery-entrance');
    initializeGalleryItems();
  }, 200);
}

function initializeGalleryItems() {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach((item) => {
    const img = item.querySelector('img');
    
    // Remove loading class when image loads
    img.addEventListener('load', () => {
      item.classList.remove('loading');
      item.classList.add('loaded');
    });
    
    // Lightbox
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'));
      openLightbox(index);
    });
  });
}

// Enhanced About section
function renderAbout(container) {
  container.innerHTML = `
    <div class="about-content fade-in">
      <h2>ABOUT</h2>
      <p>
        I could probably track my love for photography since forever, but my first film camera came to my life around 15 years ago. An old Nikon FE that belonged to my grandfather. If you ask me who am I, or ask my friends what defines me best, we'd probably say music. Music is the foundation that carries the weight of my existence. But it does require skill, order, planning, order, rationalization, and above all, time. Like a sculpture, or a painting, you have to go over it a hundred times before it has some shape to it. But everything that I've done, created, become, learned, experienced, can converge in a split second when I frame something and just shoot. In a way, I feel like a kid, just doing without the need of self reflection. No rational thoughts, just vision.
      </p>
      <p style="margin-top: 2rem;">
        If you want to check my work as a music composer, you can check:
      </p>
      <a href="https://jorgevs.com" target="_blank" class="boxed-link">VISIT JORGEVS.COM</a>
      <p style="margin-top: 2rem;">
        If you want to check my engineering persona, you can visit:
      </p>
      <a href="https://jvsvault.dev" target="_blank" class="boxed-link">VISIT JVSVAULT.DEV</a>
    </div>
  `;
}

// Enhanced Contact section
function renderContact(container) {
  container.innerHTML = `
    <div class="contact-content fade-in">
      <h2>CONTACT</h2>
      <p>
        I have built this site just to have my photographies somewhere pretty instead of collecting digital dust in a hard drive. I have no ambitions, no goals, no pretensions. But if for some reason you want to drop me a line because you want to use one of my photos, or want me to participate in some kind of way in a project with a camera, you can drop me a line here.
      </p>
      <a href="mailto:jvs.vision@proton.me" class="boxed-link">JVS.VISION@PROTON.ME</a>
    </div>
  `;
}

// Enhanced Lightbox
function initializeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  prevBtn.addEventListener('click', () => navigateImage(-1));
  nextBtn.addEventListener('click', () => navigateImage(1));
  
  // Touch gestures for mobile
  let touchStartX = null;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  lightbox.addEventListener('touchend', (e) => {
    if (!touchStartX) return;
    
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateImage(1); // Next
      } else {
        navigateImage(-1); // Previous
      }
    }
    
    touchStartX = null;
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateImage(-1);
        break;
      case 'ArrowRight':
        navigateImage(1);
        break;
    }
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const image = galleryConfig.images[index];
  
  lightboxImage.src = `/assets/gallery/${image.filename}`;
  lightboxImage.alt = image.title;
  lightbox.classList.add('active');
  
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateImage(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = galleryConfig.images.length - 1;
  } else if (currentImageIndex >= galleryConfig.images.length) {
    currentImageIndex = 0;
  }
  
  const lightboxImage = document.getElementById('lightbox-image');
  const image = galleryConfig.images[currentImageIndex];
  lightboxImage.src = `/assets/gallery/${image.filename}`;
  lightboxImage.alt = image.title;
}

// Scroll behavior
function initializeScrollBehavior() {
  let lastScrollY = 0;
  let ticking = false;
  
  function updateHeader() {
    const header = document.querySelector('.site-header');
    const scrollY = window.scrollY;
    
    if (scrollY > lastScrollY && scrollY > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// Update year
function updateYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}