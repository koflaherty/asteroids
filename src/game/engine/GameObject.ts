import World from './World.ts'
import { Container, Sprite } from 'pixi.js'
import { Point2D } from './types.ts'

export interface GameObjectConstructorParameters {
  object: Sprite | Container;
  world: World;
  position?: Point2D;
}

export class GameObject {
  object: Sprite | Container
  world: World

  constructor(args: GameObjectConstructorParameters) {
    this.world = args.world
    this.object = args.object

    if (args.position) {
      this.object.x = args.position.x
      this.object.y = args.position.y
    }
    this.world.add(this.object)
  }

  checkBoundaries() {
    const anchor = ('anchor' in this.object) ? (this.object as Sprite).anchor : { x: 0, y: 0 }
    const leftEdge = this.object.x - (this.object.width * anchor.x)
    const topEdge = this.object.y - (this.object.height * anchor.y)

    let horizontalBounds = 0
    if (leftEdge < this.world.viewport.x) {
      horizontalBounds = -1
    } else if (leftEdge > this.world.viewport.x + this.world.viewport.worldWidth) {
      horizontalBounds = 1
    }

    let verticalBounds = 0
    if (topEdge < this.world.viewport.y) {
      verticalBounds = -1
    } else if (topEdge > this.world.viewport.y + this.world.viewport.worldHeight) {
      verticalBounds = 1
    }

    return {
      outOfBounds: horizontalBounds !== 0 || verticalBounds !== 0,
      x: horizontalBounds,
      y: verticalBounds,
    }
  }
}
