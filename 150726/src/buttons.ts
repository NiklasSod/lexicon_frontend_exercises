interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  color: string;
}

export async function initCars(): Promise<void> {
  try {
    const tableBody = document.getElementById('car-table-body') as HTMLTableSectionElement| null;
    if (!tableBody) {
      console.error('Kunde inte hitta tabellelementet');
      return;
    }

    const response = await fetch('https://localhost:7063/api/cars');

    if (!response.ok) {
      throw new Error(`Error. Status: ${response.status}`);
    }
    const cars: Car[] = await response.json();
    tableBody.innerHTML = '';

    cars.forEach(car => {
      const row = document.createElement('tr');
      row.className = 'hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150';

      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${car.brand}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.model}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.year}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.color}</td>
      `;
      
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Kunde inte hämta bilar:', error);
  }
}

export async function addCar(): Promise<void> {
 // add car
}

document.querySelector<HTMLButtonElement>('#init-cars')?.addEventListener('click', initCars);