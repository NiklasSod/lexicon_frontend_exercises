export async function deleteCar(e: PointerEvent): Promise<void> {
  try {
    const button = e.currentTarget as HTMLButtonElement;
    if (!button) return;
    const carId = button.getAttribute('data-id');

    const row = button.closest('tr');
    if (!row) {
      console.warn('Rad ej funnen.');
      return;
    }

    if (carId) {
      const response = await fetch(`https://localhost:7063/api/cars/${carId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Kunde inte radera bilen. Status: ${response.status}`);
      }
      row.remove();
    }

  } catch (error) {
    console.error('Något gick fel:', error);
  }
}