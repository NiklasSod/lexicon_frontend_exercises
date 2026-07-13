function updateSpot(buttonElement, carStatus) {
  const isOccupied = buttonElement.innerHTML.trim() === '🚗';
  if (isOccupied) {
    buttonElement.setAttribute('aria-label', 'Spot is free');
    buttonElement.setAttribute('aria-describedby', 'sidebar-rates click-action-park');
    buttonElement.innerHTML = '';
  } else {
    buttonElement.setAttribute('aria-label', 'Car parked');
    buttonElement.setAttribute('aria-describedby', 'click-action-take');
    buttonElement.innerHTML = '🚗';
  }
};