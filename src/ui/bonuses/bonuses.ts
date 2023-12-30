import { Bonus } from './types.ts'

let bonusContainer: HTMLElement;

export const setupBonuses = (element: HTMLElement) => {
  bonusContainer = element;
}

export const bonusFound = (bonus: Bonus) => {
  const bonusElement = document.createElement("div");
  bonusElement.innerHTML += bonusToHTML(bonus);
  bonusContainer.appendChild(bonusElement);
}

const bonusToHTML = (bonus: Bonus) => {
  return `<a href="${bonus.url}" target="_blank">
    <div class="bonus">
      <div class="bonus-icon">
        <i class="fas fa-${bonus.icon}"></i>
      </div>
      <div class="bonus-title">
        <h3>${bonus.title}</h3>
      </div>
      <div class="bonus-description">
        <p>${bonus.description}</p>
      </div>
    </div>
  </a>`
}