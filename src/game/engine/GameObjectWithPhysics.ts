import {GameObject, GameObjectConstructorParameters} from "./GameObject.ts";
import {Vector2D} from "./types.ts";

// Convert degrees to radians
export function degreesToRadians(degrees: number)  {
  return degrees * (Math.PI / 180);
}


export interface GameObjectWithPhysicsParameters extends GameObjectConstructorParameters {
  velocity?: Vector2D;
  thrust?: Vector2D;
  decay?: number;
  initialRotation?: number;
}

export class GameObjectWithPhysics extends GameObject {
  velocity: Vector2D;
  thrust: Vector2D;
  rotationTarget: number;
  decay: number;

  constructor({velocity, thrust, collidable, initialRotation, decay, ...rest}: GameObjectWithPhysicsParameters) {
    super(rest);

    this.velocity = velocity || {x: 0, y: 0};
    this.thrust = thrust || {x: 0, y: 0};
    this.rotationTarget = initialRotation || 0;
    this.decay = decay || 0;

    this.world.subscribeToUpdate((delta) => {
      this.pixiObject.x += this.velocity.x * delta;
      this.pixiObject.y += this.velocity.y * delta;
      this.pixiObject.rotation = this.rotationTarget;
      this.decayVelocity();
    });
  }

  decayVelocity() {
    if (this.decay === 0) {
      return;
    }

    const previousVelocity = {...this.velocity};

    if (this.velocity.x !== 0) {
      this.velocity.x = this.velocity.x > 0 ? this.velocity.x - this.decay : this.velocity.x + this.decay;
      if (
        previousVelocity.x > 0 && this.velocity.x < 0 &&
        previousVelocity.x < 0 && this.velocity.x > 0
      ) {
        this.velocity.x = 0;
      }
    }

    if (this.velocity.y !== 0) {
      this.velocity.y = this.velocity.y > 0 ? this.velocity.y - this.decay : this.velocity.y + this.decay;
      if (
        previousVelocity.y > 0 && this.velocity.y < 0 &&
        previousVelocity.y < 0 && this.velocity.y > 0
      ) {
        this.velocity.y = 0;
      }
    }
  }

}
