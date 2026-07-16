interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  color: string;
}

function addCarRow(cars: Car[], carId?: number): void {
  const tableBody = document.getElementById('car-table-body') as HTMLTableSectionElement | null;
  if (!tableBody) {
    console.error('Kunde inte hitta tabellelementet');
    return;
  }

  console.log(cars)
  console.log(carId)

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
                data-id="${carId ?? car.id}">
                Redigera
              </button>
              <button 
                class="delete-btn text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                data-id="${carId ?? car.id}">
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
}

const modal = document.getElementById("modal");
const openModalBtn = document.getElementById('add-car') as HTMLButtonElement | null;
const closeModal = document.getElementById('close-modal') as HTMLButtonElement | null;
const carForm = document.getElementById("car-form") as HTMLFormElement | null;

openModalBtn?.addEventListener("click", function() {
    modal?.classList.add("show-modal");
    closeModal?.focus();
  });

carForm?.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget as HTMLFormElement);
  
  const car: Car = {
    brand: formData.get("car-brand") as string,
    model: formData.get("car-model") as string,
    year: Number(formData.get("car-year")),
    color: formData.get("car-color") as string,
  };
  addCar(car);
})

closeModal?.addEventListener('click', () => {
  modal?.classList.remove('show-modal');
  openModalBtn?.focus();
});

window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && modal && modal.classList.contains("show-modal")) {
      modal.classList.remove("show-modal");
      openModalBtn?.focus();
    }
});

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
    console.log(savedCar);

    addCarRow([car], savedCar.id);
    modal?.classList.remove("show-modal");

  } catch (error) {
    console.error('Något gick fel:', error);
  }
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
