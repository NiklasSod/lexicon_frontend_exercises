import { initCars, addCar } from './buttons.ts';

document.querySelector<HTMLButtonElement>('#init-cars')?.addEventListener('click', initCars);
document.querySelector<HTMLButtonElement>('#add-car')?.addEventListener('click', addCar);