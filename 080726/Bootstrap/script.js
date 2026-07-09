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