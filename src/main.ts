import './style.css'
import { setupCounter } from './counter.ts'
import { setupGame } from './game/game.ts'



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="gameView"></div>
    <div class="overlay">
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
  </div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

window.onload = function() {
  setupGame(document.querySelector<HTMLDivElement>('#gameView')!)
};


