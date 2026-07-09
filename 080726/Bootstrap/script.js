document.addEventListener('DOMContentLoaded', function () {
  const dynamicModal = document.getElementById('dynamicLeakModal');
  const confirmResolveBtn = document.getElementById('confirmResolveBtn');

  if (dynamicModal) {
    dynamicModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      
      const spot = button.getAttribute('data-spot');
      const description = button.getAttribute('data-desc');
      
      const modalSpotLabel = dynamicModal.querySelector('#modalSpotLabel');
      const modalSpotDescription = dynamicModal.querySelector('#modalSpotDescription');
      
      if (modalSpotLabel) {
        modalSpotLabel.textContent = spot ? `${spot}:` : 'Spot --:';
      }
      if (modalSpotDescription) {
        modalSpotDescription.textContent = description || 'Loading...';
      }
      if (spot && confirmResolveBtn) {
        const rowId = spot.toLowerCase().replace(' ', '-');
        confirmResolveBtn.setAttribute('data-target-row', rowId);
      }
    });
  }

  if (confirmResolveBtn) {
    confirmResolveBtn.addEventListener('click', function () {
      const targetRowId = this.getAttribute('data-target-row');
      const rowToDelete = document.getElementById(targetRowId);
      
      const errorAmountElement = document.getElementById('error-amount');
      if (errorAmountElement && rowToDelete) {
        errorAmountElement.textContent = parseInt(errorAmountElement.textContent) - 1;
        
        if (errorAmountElement.textContent === '0') {
          const actionRequiredButton = document.getElementById('btn-action-required');
          if (actionRequiredButton) {
            actionRequiredButton.style.display = 'none';
          }
          
          const paragraph = rowToDelete.querySelector('p');
          if (paragraph) {
            paragraph.innerHTML = 'All issues resolved.';
            paragraph.setAttribute('aria-label', 'All parkingspot issues resolved.');
          }
          
          const actionButton = rowToDelete.querySelector('.spot-modal-trigger');
          if (actionButton) {
            actionButton.remove();
          }
        } else {
          rowToDelete.remove();
        }
      }
    });
  }
});

function setActiveSidebarLink(clickedElement) {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.classList.add('link-dark');
  });
  
  clickedElement.classList.add('active');
  clickedElement.classList.remove('link-dark');
}

function showOverview(element) {
  window.location.reload(); // CHEATING :)
}

function showCameraViews() {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = '<h1 class="p-0 m-0 pb-2" id="page-title">Garage platform A - Camera Views - Under construction</h1>';
  }
}

function showPricingSettings() {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = '<h1 class="p-0 m-0 pb-2" id="page-title">Garage platform A - Pricing Settings - Under construction</h1>';
  }
}