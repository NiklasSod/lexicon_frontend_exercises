import type { Car } from '../interface/Car';
import { addCarRow } from '../script'

const modal = document.getElementById("modal");

export async function addCar(car: Car): Promise<void> {
  try {
    const response = await fetch('https://localhost:7063/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car) 
    });

    if (!response.ok) {
      throw new Error(`Kunde inte lägga till bil. Status: ${response.status}`);
    }

    const savedCar = await response.json();

    addCarRow([car], savedCar.id);
    modal?.classList.remove("show-modal");

  } catch (error) {
    console.error('Något gick fel:', error);
  }
}