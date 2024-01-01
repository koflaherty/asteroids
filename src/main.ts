import './style.css'
import { setupGame } from './game/game.ts'
import { setupScore } from './ui/score/score.ts'
import { setupBonuses } from './ui/bonuses/bonuses.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="gameView"></div>
    <div id="gui" class="overlay">
      <div class="score">Score: <span id="score">0</span></div>
      <div class="bonuses">
        <div id="bonus-label" class="bonuses__label bonuses__label--hidden">Bonuses</div>
        <div id="bonuses"></div>
      </div>
    </div>
  </div>
`

window.onload = function() {
  setupGame(document.querySelector<HTMLDivElement>('#gameView')!)
  setupScore(document.querySelector<HTMLElement>('#score')!)
  setupBonuses({
    bonusContainer: document.querySelector<HTMLElement>('#bonuses')!,
    bonusLabel: document.querySelector<HTMLElement>('#bonus-label')!,
    gui: document.querySelector<HTMLElement>('#gui')!,
  });
}


