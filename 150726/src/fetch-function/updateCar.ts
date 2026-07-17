import type { Car } from '../interface/Car';
import { resetModalState } from '../script';

const modal = document.getElementById("modal");
const openModalBtn = document.getElementById('add-car') as HTMLButtonElement | null;

export async function updateCar(car: Car, carId: number, row: HTMLTableRowElement): Promise<void> {
  try {
    const response = await fetch(`https://localhost:7063/api/cars/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    });

    if (!response.ok) {
      throw new Error(`Kunde inte uppdatera bilen. Status: ${response.status}`);
    }

    const cells = row.querySelectorAll('td');
    cells[0].textContent = car.brand;
    cells[1].textContent = car.model;
    cells[2].textContent = car.year.toString();
    cells[3].textContent = car.color;

    resetModalState();
    modal?.classList.remove('show-modal');
    openModalBtn?.focus();

  } catch (error) {
    console.error('Något gick fel:', error);
  }
}