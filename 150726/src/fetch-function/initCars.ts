import type { Car } from '../interface/Car';
import { addCarRow } from '../script'

export async function initCars(): Promise<void> {
  try {
    const tableBody = document.getElementById('car-table-body') as HTMLTableSectionElement | null;
    if (!tableBody) {
      console.error('Kunde inte hitta tabellelementet');
      return;
    }

    const response = await fetch('https://localhost:7063/api/cars');

    if (!response.ok) {
      throw new Error(`Error. Status: ${response.status}`);
    }
    const tempText = document.getElementById("temp-text") as HTMLParagraphElement | null;
    if (tempText){
      tempText.remove();
    }
    const cars: Car[] = await response.json();
    tableBody.innerHTML = '';

    addCarRow(cars);

  } catch (error) {
    console.error('Kunde inte hämta bilar:', error);
  }
}