// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const content = document.getElementById('content');
  
  // Function to load section content
  async function loadSection(sectionId) {
    try {
      const response = await fetch(`${sectionId}.html`);
      const html = await response.text();
      content.innerHTML = html;
      
      // Add highlight animation
      content.classList.add('section-highlight');
      setTimeout(() => {
        content.classList.remove('section-highlight');
      }, 1000);
      
      // Protect gallery images when gallery is shown
      if (sectionId === 'gallery') {
        setTimeout(protectGalleryImages, 100);
      }
    } catch (error) {
      console.error('Error loading section:', error);
      content.innerHTML = '<p>Error loading content. Please try again.</p>';
    }
  }
  
  // Function to show a specific section
  function showSection(sectionId) {
    loadSection(sectionId);
    
    // Update active nav link
    navLinks.forEach(link => {
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Add click event listeners to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      
      // Update URL hash
      window.location.hash = sectionId;
    });
  });
  
  // Load section based on URL hash
  function loadInitialSection() {
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'gallery', 'links'];
    
    if (validSections.includes(hash)) {
      showSection(hash);
    } else {
      showSection('home');
    }
  }
  
  // Handle browser back/forward buttons
  window.addEventListener('hashchange', loadInitialSection);
  
  // Show home section by default
  loadInitialSection();
});
