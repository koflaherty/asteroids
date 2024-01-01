import { Bonus } from './types.ts'

let bonusContainer: HTMLElement;

export const setupBonuses = (element: HTMLElement) => {
  bonusContainer = element;
}

export const bonusFound = (bonus: Bonus) => {
  const bonusLink = document.createElement("a");
  bonusLink.href = bonus.url;
  bonusLink.target = "_blank";
  bonusLink.className = "bonus animate";
  bonusLink.innerHTML = `
    <div class="bonus__icon">
      ${bonus.icon === "link" ?
        '<img class="bonus__icon__svg" src="assets/link.svg" alt="link icon" />' :
        '<img class="bonus__icon__svg" src="assets/mail.svg" alt="mail icon" />'
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
}