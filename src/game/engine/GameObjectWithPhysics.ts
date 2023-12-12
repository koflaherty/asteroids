import { GameObject, GameObjectConstructorParameters } from './GameObject.ts'
import { Vector2D } from './types.ts'

// Convert degrees to radians
export function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180)
}

export interface GameObjectWithPhysicsParameters extends GameObjectConstructorParameters {
  velocity?: Vector2D;
  maxVelocity?: number;
  thrust?: number;
  decay?: number;
}

export class GameObjectWithPhysics extends GameObject {
  velocity: Vector2D
  maxVelocity: number
  thrust: number
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
    this.thrust = thrust || 0
    this.decay = decay || 0
    this.rotationTarget = null

    this.world.subscribeToUpdate((delta) => {
      this.pixiObject.x += this.velocity.x * delta
      this.pixiObject.y += this.velocity.y * delta
      this.decayVelocity(delta)
      this.applyThrust(delta)

      if (this.rotationTarget) {
        const rotationEase = 0.08;
        let dx = this.rotationTarget.x - this.pixiObject.x;
        let dy = this.rotationTarget.y - this.pixiObject.y;
        let targetAngle = Math.atan2(dy, dx);
        // Calculate difference between current rotation and target rotation
        let diff = targetAngle - this.pixiObject.rotation;

        // Normalize difference to the (-PI, PI) interval
        if (diff > Math.PI) diff -= Math.PI * 2;
        if (diff < -Math.PI) diff += Math.PI * 2;

        // Make a small rotation step at a time until reaching the target
        this.pixiObject.rotation += diff * rotationEase;
      }
    })
  }

  private applyThrust(delta: number) {
    // Assume this.rotation is the rotation angle in radians
    // and this.thrust is a scalar value indicating the strength of thrust

    let thrustX = this.thrust * Math.cos(this.pixiObject.rotation);
    let thrustY = this.thrust * Math.sin(this.pixiObject.rotation);

    this.velocity.x += thrustX * delta;
    this.velocity.y += thrustY * delta;

    let speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (speed > this.maxVelocity) {
      let reductionFactor = this.maxVelocity / speed;
      this.velocity.x *= reductionFactor;
      this.velocity.y *= reductionFactor;
    }
  }

  private decayVelocity(delta: number) {
    if (this.decay === 0) {
      return
    }
    const decayWithDelta = this.decay * delta;
    const previousVelocity = { ...this.velocity }

    if (this.velocity.x !== 0) {
      this.velocity.x = this.velocity.x > 0 ? this.velocity.x - decayWithDelta : this.velocity.x + decayWithDelta
      if (
        previousVelocity.x > 0 && this.velocity.x < 0 &&
        previousVelocity.x < 0 && this.velocity.x > 0
      ) {
        this.velocity.x = 0
      }
    }

    if (this.velocity.y !== 0) {
      this.velocity.y = this.velocity.y > 0 ? this.velocity.y - decayWithDelta : this.velocity.y + decayWithDelta
      if (
        previousVelocity.y > 0 && this.velocity.y < 0 &&
        previousVelocity.y < 0 && this.velocity.y > 0
      ) {
        this.velocity.y = 0
      }
    }
  }

}
