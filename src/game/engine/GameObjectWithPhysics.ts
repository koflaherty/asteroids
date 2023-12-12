import { GameObject, GameObjectConstructorParameters } from './GameObject.ts'
import { Vector2D } from './types.ts'

// Convert degrees to radians
export function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180)
}

export interface GameObjectWithPhysicsParameters extends GameObjectConstructorParameters {
  velocity?: Vector2D;
  maxVelocity?: number;
  thrust?: Vector2D;
  decay?: number;
}

export class GameObjectWithPhysics extends GameObject {
  velocity: Vector2D
  maxVelocity: number
  thrust: Vector2D
  rotationTarget: Vector2D | null
  decay: number

  constructor({
    velocity,
    thrust,
    collidable,
    maxVelocity,
    decay,
    ...rest
  }: GameObjectWithPhysicsParameters) {
    super(rest)

    this.velocity = velocity || { x: 0, y: 0 }
    this.maxVelocity = maxVelocity || 100
    this.thrust = thrust || { x: 0, y: 0 }
    this.decay = decay || 0
    this.rotationTarget = null

    this.world.subscribeToUpdate((delta) => {
      this.pixiObject.x += this.velocity.x * delta
      this.pixiObject.y += this.velocity.y * delta
      this.decayVelocity()
      this.applyThrust()

      if (this.rotationTarget) {
        let dx = this.rotationTarget.x - this.pixiObject.x;
        let dy = this.rotationTarget.y - this.pixiObject.y;
        let angle = Math.atan2(dy, dx);

        this.pixiObject.rotation = angle;
      }
    })
  }

  private applyThrust() {
    this.velocity.x += this.thrust.x
    this.velocity.y += this.thrust.y
    if (this.velocity.x > this.maxVelocity) {
      this.velocity.x = this.maxVelocity
    }
    if (this.velocity.x < -this.maxVelocity) {
      this.velocity.x = -this.maxVelocity
    }
    if (this.velocity.y > this.maxVelocity) {
      this.velocity.y = this.maxVelocity
    }
    if (this.velocity.y < -this.maxVelocity) {
      this.velocity.y = -this.maxVelocity
    }
  }

  private decayVelocity() {
    if (this.decay === 0) {
      return
    }

    const previousVelocity = { ...this.velocity }

    if (this.velocity.x !== 0) {
      this.velocity.x = this.velocity.x > 0 ? this.velocity.x - this.decay : this.velocity.x + this.decay
      if (
        previousVelocity.x > 0 && this.velocity.x < 0 &&
        previousVelocity.x < 0 && this.velocity.x > 0
      ) {
        this.velocity.x = 0
      }
    }

    if (this.velocity.y !== 0) {
      this.velocity.y = this.velocity.y > 0 ? this.velocity.y - this.decay : this.velocity.y + this.decay
      if (
        previousVelocity.y > 0 && this.velocity.y < 0 &&
        previousVelocity.y < 0 && this.velocity.y > 0
      ) {
        this.velocity.y = 0
      }
    }
  }

}
