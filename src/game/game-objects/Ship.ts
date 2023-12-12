import { Sprite } from 'pixi.js'
import { GameObjectWithPhysics, GameObjectWithPhysicsParameters } from '../engine/GameObjectWithPhysics.ts'
import { Vector2D } from '../engine/types.ts'
import { distanceBetweenVectors, magnitudeOfVector2D } from '../engine/helpers.ts'

export class Ship extends GameObjectWithPhysics {
  targetPosition: Vector2D | null;
  constructor(args: Omit<GameObjectWithPhysicsParameters, 'pixiObject'>) {
    const ship = Sprite.from('/assets/ship.png')
    ship.anchor.set(0.5)

    super({
    ...args,
      pixiObject: ship,
    });
    this.targetPosition = null;

    this.world.subscribeToUpdate(() => {
      if (this.targetPosition && distanceBetweenVectors(ship.position, this.targetPosition) < 75) {
        this.targetPosition = null;
      }

      if (this.targetPosition) {
        // Direction to the target
        let dx = this.targetPosition.x - ship.position.x;
        let dy = this.targetPosition.y - ship.position.y;

        // Distance to the target
        let distanceToTarget = Math.sqrt(dx*dx + dy*dy);

        // Predictive offset, proportional to velocity and distance
        let offsetMagnitude = magnitudeOfVector2D(this.velocity) * distanceToTarget * 0.005; // adjust the coefficient as needed

        // Calculate the offset
        let offsetX = this.velocity.x * offsetMagnitude;
        let offsetY = this.velocity.y * offsetMagnitude;

        this.rotationTarget = {
          x: this.targetPosition.x + offsetX,
          y: this.targetPosition.y + offsetY,
        };
        this.thrust = 0.2;
      } else {
        this.rotationTarget = null;
        this.thrust = 0;
      }
    })

    // Check for clicks
    this.world.mountToElement.addEventListener("click", (e) => {
      console.log({
        x: e.clientX,
        y: e.clientY,
        vX: this.world.viewport.x,
        vY: this.world.viewport.y,
      })
      const clickPosition = {
        x: e.clientX - this.world.viewport.x,
        y: e.clientY - this.world.viewport.y,
      }
      this.moveTo(clickPosition)
    })
  }

  moveTo(position: Vector2D) {
    this.targetPosition = position;
  }
}