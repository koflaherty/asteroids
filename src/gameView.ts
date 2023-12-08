import { Application, Sprite } from 'pixi.js'
import {Viewport} from "pixi-viewport";
const bunny = Sprite.from('https://pixijs.com/assets/bunny.png')

export function setupGameView(element: HTMLDivElement) {
  const app = new Application<HTMLCanvasElement>({
    background: "red",
    resizeTo: window,
  });

  // create viewport
  const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 3000,
    worldHeight: 3000,
    events: app.renderer.events // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
  })

// add the viewport to the stage
  app.stage.addChild(viewport)

// activate plugins
  viewport
  .drag()
  .decelerate()
  .clamp({
    direction: "all",
  });
  viewport.x = -100
  viewport.y = -100



  viewport.addChild(bunny)
  // center the sprite's anchor point
  bunny.anchor.set(0.5)

// move the sprite to the center of the screen
  bunny.x = app.screen.width / 2
  bunny.y = app.screen.height / 2

  element.appendChild(app.view);

  app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny.rotation += 0.1 * delta;
  });
}
