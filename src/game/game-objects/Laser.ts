import {Sprite} from "pixi.js";
import {GameObjectWithPhysics} from "../engine/GameObjectWithPhysics.ts";
import {Ship} from "./Ship.ts";
import {createVector} from "../engine/helpers.ts";
import {CollisionBox} from "../engine/GameObject.ts";
import World from "../engine/World.ts";
import {Collidable} from "../engine/CollisionDetector.ts";
import {getRandom} from "../../helpers/helpers.ts";

export class Laser extends GameObjectWithPhysics {
  unsubscribeToTick: () => void
  world: World
  sprite: Sprite

  constructor({ship}: {
    ship: Ship,
  }) {
    const laserSprite = Sprite.from('/assets/laser.png')
    laserSprite.rotation = ship.pixiObject.rotation + getRandom({
      min: Math.PI / -36,
      max: Math.PI / 36,
    });
    laserSprite.anchor.set(0.5)

    super({
      pixiObject: laserSprite,
      world: ship.world,
      position: { x: ship.pixiObject.x, y: ship.pixiObject.y},
      velocity: createVector(5, laserSprite.rotation),
      // maxVelocity: 100,
      // thrust: 100,
      // rotationTarget: null,
      // decay: 0,
    });
    this.sprite = laserSprite;
    this.world = ship.world;
    this.addCollidable({
      object: this,
      type: 'laser',
      collidesWith: ['asteroid'],
    });

    this.unsubscribeToTick = this.world.subscribeToUpdate(() => {
      if (this.checkBoundaries().outOfBounds) {
        this.destroy();
      }
    })
  }

  onCollision(_collidable: Collidable, _boxes: CollisionBox[][]) {
    setTimeout(() => {
      console.log('laser hit asteroid')
      this.destroy();
    }, 10);

  }

  destroy() {
    this.world.remove(this.sprite);
    this.unsubscribeToTick();
  }
}
