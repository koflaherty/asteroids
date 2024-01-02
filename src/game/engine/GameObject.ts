import World from './World.ts'
import { Container, Rectangle, Sprite } from 'pixi.js'
import { Point2D } from './types.ts'
import { Collidable } from './CollisionDetector.ts'

export interface GameObjectConstructorParameters {
  pixiObject: Sprite | Container;
  world: World;
  position?: Point2D;
  collidable?: Omit<Collidable, 'object'>;
}

export interface CollisionBox {
  box: Rectangle;
  info?: Record<string, any>,
}

export class GameObject {
  pixiObject: Sprite | Container
  world: World
  collidable: Collidable | null

  constructor(args: GameObjectConstructorParameters) {
    this.world = args.world
    this.pixiObject = args.pixiObject
    this.collidable = null

    if (args.position) {
      this.pixiObject.x = args.position.x
      this.pixiObject.y = args.position.y
    }
    this.world.add(this.pixiObject)
  }

  checkBoundaries() {
    const anchor = ('anchor' in this.pixiObject) ? (this.pixiObject as Sprite).anchor : { x: 0, y: 0 }
    const leftEdge = this.pixiObject.x - (this.pixiObject.width * anchor.x)
    const topEdge = this.pixiObject.y - (this.pixiObject.height * anchor.y)

    let horizontalBounds = 0
    if (leftEdge < 0) {
      horizontalBounds = -1
    } else if (leftEdge + this.pixiObject.width > this.world.viewport.worldWidth) {
      horizontalBounds = 1
    }

    let verticalBounds = 0
    if (topEdge < 0) {
      verticalBounds = -1
    } else if (topEdge + this.pixiObject.height > this.world.viewport.worldHeight) {
      verticalBounds = 1
    }

    return {
      outOfBounds: horizontalBounds !== 0 || verticalBounds !== 0,
      x: horizontalBounds,
      y: verticalBounds,
    }
  }

  addCollidable(collidable: Collidable) {
    this.collidable = collidable
    this.world.addCollidable(this.collidable)
  }

  checkCollision(collidable: Collidable) {
    if (collidable.object === this || this.collidable === null) {
      return false
    }

    // Check if bounding boxes intersect
    if (!collidable.object.pixiObject.getBounds().intersects(this.collidable.object.pixiObject.getBounds())) {
      return false
    }

    const collisions1 = this.getCollisionBoxes()
    const collisions2 = collidable.object.getCollisionBoxes()
    const collisions = []

    for (let i = 0; i < collisions1.length; i++) {
      for (let j = 0; j < collisions2.length; j++) {
        if (collisions1[i].box.intersects(collisions2[j].box)) {
          collisions.push([collisions1[i], collisions2[j]])
        }
      }
    }
    if (collisions.length === 0) {
      return false
    } else {
      return collisions
    }
  }

  /**
   * This is a placeholder handling the effects of a collision.
   */
  onCollision(_collidable: Collidable, _boxes: CollisionBox[][]) {
  }

  /**
   * Override this if you'd like to provide more detailed collision detection.
   */
  getCollisionBoxes(): CollisionBox[] {
    return [{ box: this.rect() }]
  }

  rect(): Rectangle {
    let offset = { x: 0, y: 0 }
    if ('anchor' in this.pixiObject) {
      offset = {
        x: this.pixiObject.anchor.x * this.pixiObject.width,
        y: this.pixiObject.anchor.y * this.pixiObject.height,
      }
    }

    return new Rectangle(
      this.pixiObject.x - offset.x,
      this.pixiObject.y - offset.y,
      this.pixiObject.width,
      this.pixiObject.height,
    )
  }
}
