let scoreElement: HTMLElement;

export const setupScore = (element: HTMLElement) => {
  scoreElement = element;
  const catFound = new CustomEvent("increment");
  element.dispatchEvent(catFound);
  element.addEventListener("increment", () => {
    console.log("INCREMENT");
  });
}

export const incrementScore = () => {
  if (!scoreElement) return

  const incrementEvent = new CustomEvent("increment");
  scoreElement.innerHTML = String(Number(scoreElement.innerHTML) + 1);
  scoreElement.dispatchEvent(incrementEvent);
}
