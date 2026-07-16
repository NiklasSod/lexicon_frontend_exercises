import { initCars } from './buttons.ts';

document.querySelector<HTMLButtonElement>('#init-cars')?.addEventListener('click', initCars);