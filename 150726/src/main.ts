import './style.css'
import { initCars } from './buttons.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <header id="">
    <p>Header</p>
  </header>

  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>

  <button 
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
    id="init-cars">
      Init cars
    </button>
</div>
`

document.querySelector<HTMLButtonElement>('#init-cars')?.addEventListener('click', initCars);