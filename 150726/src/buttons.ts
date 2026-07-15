interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  color: string;
}

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

    cars.forEach(car => {
      const row = document.createElement('tr');
      row.className = 'hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150';

      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${car.brand}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.model}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.year}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.color}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div class="flex gap-2 justify-end sm:justify-start">
            <button 
              class="edit-btn text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
              data-id="${car.id}">
              Redigera
            </button>
            <button 
              class="delete-btn text-red-600 hover:text-red-900 focus:outline-none focus:underline"
              data-id="${car.id}">
              Ta bort
            </button>
          </div>
        </td>
      `;

      const editBtn = row.querySelector('.edit-btn') as HTMLButtonElement;
      editBtn.addEventListener('click', (e) => editCar(e));

      const deleteBtn = row.querySelector('.delete-btn') as HTMLButtonElement;
      deleteBtn.addEventListener('click', (e) => deleteCar(e));
      
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Kunde inte hämta bilar:', error);
  }
}

export async function addCar(): Promise<void> {
 // add car
 console.log('adding car...');
}

export async function editCar(e: PointerEvent): Promise<void> {
 // edit car
 console.log('editing car...');
}

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
