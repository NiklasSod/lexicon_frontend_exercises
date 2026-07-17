import type { Car } from './interface/Car';
import { addCar } from './fetch-function/addCar';
import { updateCar } from './fetch-function/updateCar';
import { deleteCar } from './fetch-function/deleteCar';

export function addCarRow(cars: Car[], carId?: number): void {
  const tableBody = document.getElementById('car-table-body') as HTMLTableSectionElement | null;
  if (!tableBody) {
    console.error('Kunde inte hitta tabellelementet');
    return;
  }

  cars.forEach(car => {
    const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150';

        const carLabel = `${car.brand} ${car.model}`;

        row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${car.brand}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.model}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.year}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${car.color}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex gap-2 justify-end sm:justify-start">
              <button 
                class="edit-btn text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                data-id="${carId ?? car.id}"
                aria-label="Edit ${carLabel}">
                Redigera
              </button>
              <button 
                class="delete-btn text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                data-id="${carId ?? car.id}"
                aria-label="Delete ${carLabel}">
                Ta bort
              </button>
            </div>
          </td>
        `;

        const editBtn = row.querySelector('.edit-btn') as HTMLButtonElement;
        editBtn.addEventListener('click', (e) => editCarButton(e));

        const deleteBtn = row.querySelector('.delete-btn') as HTMLButtonElement;
        deleteBtn.addEventListener('click', (e) => deleteCar(e));
        
        tableBody.appendChild(row);
      });
}

const modal = document.getElementById("modal");
const openModalBtn = document.getElementById('add-car') as HTMLButtonElement | null;
const closeModal = document.getElementById('close-modal') as HTMLButtonElement | null;
const carForm = document.getElementById("car-form") as HTMLFormElement | null;
const modalTitle = document.querySelector('#modal h3') as HTMLHeadingElement | null;

let editingCarId: number | null = null;
let editingRow: HTMLTableRowElement | null = null;

openModalBtn?.addEventListener("click", function() {
    resetModalState();
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

  if (editingCarId !== null && editingRow) {
    await updateCar(car, editingCarId, editingRow);
  } else {
    await addCar(car);
  }
})

export function resetModalState(): void {
  editingCarId = null;
  editingRow = null;
  if (modalTitle) modalTitle.textContent = 'Add a new car';
  carForm?.reset();
}

closeModal?.addEventListener('click', () => {
  modal?.classList.remove('show-modal');
  resetModalState();
  openModalBtn?.focus();
});

window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && modal && modal.classList.contains("show-modal")) {
      modal.classList.remove("show-modal");
      resetModalState();
      openModalBtn?.focus();
    }
});

export async function editCarButton(e: PointerEvent): Promise<void> {
  const button = e.currentTarget as HTMLButtonElement;
  if (!button) return;

  const carId = button.getAttribute('data-id');
  if (!carId) return;

  const row = button.closest('tr');
  if (!row) return;

  const cells = row.querySelectorAll('td');

  const brandInput = document.querySelector<HTMLInputElement>('input[name="car-brand"]');
  const modelInput = document.querySelector<HTMLInputElement>('input[name="car-model"]');
  const yearInput = document.querySelector<HTMLInputElement>('input[name="car-year"]');
  const colorInput = document.querySelector<HTMLInputElement>('input[name="car-color"]');

  if (brandInput) brandInput.value = cells[0]?.textContent?.trim() || '';
  if (modelInput) modelInput.value = cells[1]?.textContent?.trim() || '';
  if (yearInput) yearInput.value = cells[2]?.textContent?.trim() || '';
  if (colorInput) colorInput.value = cells[3]?.textContent?.trim() || '';

  editingCarId = Number(carId);
  editingRow = row;

  if (modalTitle) modalTitle.textContent = 'Edit car';

  modal?.classList.add('show-modal');
  closeModal?.focus();
}

