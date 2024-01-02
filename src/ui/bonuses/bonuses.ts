import { Bonus } from './types.ts'
import { TOTAL_BONUSES } from '../../content.ts'

let bonusContainer: HTMLElement
let bonusLabel: HTMLElement
let guiContainer: HTMLElement
let bonusesFound = 0;

export const setupBonuses = (args: {
  bonusContainer: HTMLElement,
  bonusLabel: HTMLElement,
  gui: HTMLElement,
}) => {
  bonusContainer = args.bonusContainer
  bonusLabel = args.bonusLabel
  guiContainer = args.gui
  updateBonusLabelText();
}

const updateBonusLabelText = () => {
  bonusLabel.innerHTML = `Bonuses ${bonusesFound}/${TOTAL_BONUSES}`;
}

export const bonusFound = (bonus: Bonus) => {
  // Create Bonus Element
  const bonusLink = document.createElement('a')
  bonusLink.href = bonus.url
  bonusLink.target = '_blank'
  bonusLink.className = 'bonus appear'
  bonusLink.innerHTML = `
    <div class="bonus__icon">
      ${bonus.icon === 'link' ?
    '<img class="bonus__icon__svg" src="/assets/link.svg" alt="link icon" />' :
    '<img class="bonus__icon__svg" src="/assets/mail.svg" alt="mail icon" />'
  }
    </div>
    <div class="bonus__content">
      <div class="bonus__title">
        ${bonus.title}
      </div>
      <div class="bonus__description">
        ${bonus.description}
      </div>
    </div>
  `
  bonusContainer.appendChild(bonusLink)

  // Create Bonus Acquired Message
  const guiMessage = document.createElement('div')
  guiMessage.className = 'full-screen-message'
  guiMessage.innerHTML = 'Bonus Acquired'
  guiContainer.appendChild(guiMessage)

  // Add to Count and Update Labels Text
  bonusesFound += 1
  updateBonusLabelText();

  // Show Bonuses Label in GUI
  bonusLabel.classList.remove('bonuses__label--hidden')
}