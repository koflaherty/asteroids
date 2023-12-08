import { Application, Sprite } from 'pixi.js'
const bunny = Sprite.from('https://pixijs.com/assets/bunny.png')

export function setupGameView(element: HTMLDivElement) {
  const app = new Application<HTMLCanvasElement>({
    background: "red",
    resizeTo: window,
  });

  app.stage.addChild(bunny)
  // center the sprite's anchor point
  bunny.anchor.set(0.5)

// move the sprite to the center of the screen
  bunny.x = app.screen.width / 2
  bunny.y = app.screen.height / 2

  element.appendChild(app.view);

  app.ticker.add((delta) => {
    bunny.x = app.screen.width / 2
    bunny.y = app.screen.height / 2
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny.rotation += 0.1 * delta;
  });
}
