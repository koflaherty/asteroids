import { GameObject } from './GameObject.ts'
import World from './World.ts'
import { Vector2D } from './types.ts'
import { Container, Rectangle, Sprite } from 'pixi.js'

export type Collidable = {
  object: GameObject;
  type: string;
  collidesWith: string[],
}

export class CollisionDetector {
  collidables: Collidable[] = []

  constructor(world: World) {
    this.collidables = []

    world.subscribeToUpdate(() => {
      this.collidables.forEach((collidableA) => {
        this.collidables.forEach((collidableB) => {
          if (!collidableA.collidesWith.find(collidesWith => collidesWith === collidableB.type)) {
            return;
          }
          const collisions = collidableA.object.checkCollision(collidableB);
          if (collisions) {
            collidableA.object.onCollision(collidableB, collisions)
          }
        })
      })
    })
  }

  add(collidable: Collidable) {
    this.collidables.push(collidable)
  }

  remove(sprite: Sprite | Container) {
    this.collidables = this.collidables.filter(function(collidable) {
      return collidable.object.pixiObject !== sprite;
    });
  }

  checkClickedOn(position: Vector2D) {
    const hitSize = 10;
    const clickBounds = new Rectangle(position.x - hitSize / 2, position.y - hitSize / 2, hitSize, hitSize);
    const clickObject = this.collidables.find((collidable) => {
      const objectRect = new Rectangle(collidable.object.pixiObject.position.x, collidable.object.pixiObject.position.y, collidable.object.pixiObject.width, collidable.object.pixiObject.height);
      if (
        clickBounds.intersects(objectRect) &&
        collidable.object.getCollisionBoxes().find((box) => {
          return box.box.intersects(clickBounds);
        })
      ) {
        return true;
      }
    })
    return clickObject;
  }
}