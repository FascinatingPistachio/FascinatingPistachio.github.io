// Gallery image protection
function protectGalleryImages() {
  const galleryItems = document.querySelectorAll('.gallery-image-container');
  
  galleryItems.forEach(container => {
    // Prevent right-click
    container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
    
    // Prevent drag
    container.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  });
}

// Initialize gallery protection when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // If gallery is initially visible, protect images
  if (document.getElementById('gallery')) {
    protectGalleryImages();
  }
});
