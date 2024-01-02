import { Application, Container, Sprite } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Collidable, CollisionDetector } from './CollisionDetector.ts'

class World {
  app: Application<HTMLCanvasElement>;
  viewport: Viewport;
  collisionDetector: CollisionDetector;
  mountToElement: HTMLElement;

  constructor(args: {
    mountToElement: HTMLElement;
    backgroundColor: string;
    size: {
      x: number,
      y: number
    },
  }) {
    this.app = new Application({
      background: args.backgroundColor,
      resizeTo: args.mountToElement,
    });
    this.viewport = new Viewport({
      worldWidth: args.size.x,
      worldHeight: args.size.y,
      events: this.app.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    this.collisionDetector = new CollisionDetector(this);
    this.mountToElement = args.mountToElement;

    this.viewport
      // .drag()
      // .decelerate()
      .clamp({
        direction: "all",
      });

    this.app.stage.addChild(this.viewport);
    this.mountToElement.appendChild(this.app.view);
  }

  add(sprite: Sprite | Container) {
    this.viewport.addChild(sprite);
  }

  remove (sprite: Sprite | Container) {
    this.viewport.removeChild(sprite);
    this.collisionDetector.remove(sprite);
  }

  addCollidable(collidable: Collidable) {
    this.collisionDetector.add(collidable);
  }

  follow(sprite: Container) {
    // const radius = window.innerWidth > window.innerHeight ? window.innerHeight / 4 : window.innerWidth / 4;
    this.viewport.follow(sprite, {
      // radius,
    });
  }

  getCenter() {
    return {
      x: this.viewport.worldWidth / 2,
      y: this.viewport.worldHeight / 2,
    }
  }

  subscribeToUpdate(callback: (delta: number) => void) {
    this.app.ticker.add(callback);
    return () => this.app.ticker.remove(callback);
  }

}
export default World
