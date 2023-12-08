import { Application, Sprite } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

class World {
  app: Application<HTMLCanvasElement>
  viewport: Viewport
  constructor(args: {
    mountToElement: HTMLElement;
    backgroundColor: string;
    size: {
      x: number,
      y: number
    },
  }) {
    this.app = new Application({
      background: 'yellow',
      resizeTo: args.mountToElement,
    });

    this.viewport = new Viewport({
      worldWidth: 3000,
      worldHeight: 3000,
      events: this.app.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    // this.viewport
    //   .drag()
    //   .decelerate()
    //   .clamp({
    //     direction: "all",
    //   });

    this.app.stage.addChild(this.viewport);
    args.mountToElement.appendChild(this.app.view);
  }

  add(sprite: Sprite) {
    this.viewport.addChild(sprite);
    this.app.ticker.add((delta) => {

      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      sprite.rotation += 0.1 * delta;
    });
  }

  follow(sprite: Sprite) {
    this.viewport.follow(sprite, {
      speed: 0,
    });
  }

  getCenter() {
    return {
      x: this.viewport.worldWidth / 2,
      y: this.viewport.worldHeight / 2,
    }
  }

}
export default World