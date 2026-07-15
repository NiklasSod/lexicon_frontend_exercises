interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
}

export async function initCars(): Promise<void> {
  try {
    const response = await fetch('https://localhost:7063/api/cars');

    if (!response.ok) {
      throw new Error(`Error. Status: ${response.status}`);
    }

    const cars: Car[] = await response.json();
    console.log(cars);

  } catch (error) {
    console.error('Kunde inte hämta bilar:', error);
  }
}

document.querySelector<HTMLButtonElement>('#init-cars')?.addEventListener('click', initCars);