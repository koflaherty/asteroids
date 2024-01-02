import './style.css'
import { setupGame, startGame } from './game/game.ts'
import { setupScore } from './ui/score/score.ts'
import { setupBonuses } from './ui/bonuses/bonuses.ts'

let hasStarted = false;
window.onStart = () => {
  if (!hasStarted) {
    hasStarted = true;
    startGame();
    const guide = document.getElementById("guide");
    guide?.classList.add("modal--closed")
  }
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="gameView"></div>
    <div id="gui" class="overlay">
      <div class="score">Score: <span id="score">0</span></div>
      <div class="bonuses">
        <div id="bonus-label" class="bonuses__label bonuses__label--hidden">Bonuses</div>
        <div id="bonuses"></div>
      </div>
    </div>
    <div id="guide" class="modal">
      <div class="modal__backdrop"></div>
      <div class="modal__content">
        <h1>Developer Galaxy</h1>
        <p>Welcome to Developer Galaxy, an interactive portfolio designed to allow players to learn more about my skills and background. Your mission is simple:</p>
        <ol>
        <li class="highlight">Tap to Explore: <span class="text-color">Simply tap or click anywhere on the screen to pilot the ship.</span></li>
        <li class="highlight">Destroy to Discover: <span class="text-color">Launch a targeted attack against an asteroid to access information about me and my work.</span></li>
        </ol>
<!--        <p>Ready to begin?</p>-->
        <div class="modal__buttons">
          <button class="button" onclick="window.onStart()">Start</button>
        <div>
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


