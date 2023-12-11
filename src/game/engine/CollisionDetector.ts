import { GameObject } from './GameObject.ts'
import World from './World.ts'

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
          const collisions = collidableA.object.checkCollision(collidableB);
          if (collisions) {
            collidableA.object.onCollision(collisions)
          }
        })
      })
    })
  }

  add(collidable: Collidable) {
    this.collidables.push(collidable)
  }
}