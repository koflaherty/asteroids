let scoreElement: HTMLElement;

export const setupScore = (element: HTMLElement) => {
  scoreElement = element;
}

export const incrementScore = () => {
  if (!scoreElement) return
  scoreElement.innerHTML = String(Number(scoreElement.innerHTML) + 1);
}
