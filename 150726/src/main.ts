import { initCars } from './fetch-function/initCars';

document.querySelector<HTMLButtonElement>('#init-cars')?.addEventListener('click', initCars);