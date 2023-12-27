import './style.css'
import { setupGame } from './game/game.ts'
import {setupScore} from "./ui/score/score.ts";



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="gameView"></div>
    <div class="overlay">
      <div class="score">Score: <span id="score">0</span></div>
  </div>
  </div>
`

window.onload = function() {
  setupGame(document.querySelector<HTMLDivElement>('#gameView')!)
  setupScore(document.querySelector<HTMLElement>('#score')!)
};


