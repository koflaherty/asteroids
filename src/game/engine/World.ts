import { Application, Container, Sprite } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Collidable, CollisionDetector } from './CollisionDetector.ts'

class World {
  app: Application<HTMLCanvasElement>;
  viewport: Viewport;
  collisionDetector: CollisionDetector;

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
      worldWidth: 3000,
      worldHeight: 3000,
      events: this.app.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    this.collisionDetector = new CollisionDetector(this);

    this.viewport
      .drag()
      .decelerate()
      .clamp({
        direction: "all",
      });

    this.app.stage.addChild(this.viewport);
    args.mountToElement.appendChild(this.app.view);
  }

  add(sprite: Sprite | Container) {
    this.viewport.addChild(sprite);
  }

  addCollidable(collidable: Collidable) {
    this.collisionDetector.add(collidable);
  }

  follow(sprite: Container) {
    const radius = window.innerWidth > window.innerHeight ? window.innerHeight / 8 : window.innerWidth / 8;
    this.viewport.follow(sprite, {
      radius,
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
