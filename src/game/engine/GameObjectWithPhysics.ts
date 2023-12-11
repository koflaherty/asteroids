import {GameObject, GameObjectConstructorParameters} from "./GameObject.ts";
import {Vector2D} from "./types.ts";


interface GameObjectWithPhysicsParameters extends GameObjectConstructorParameters {
  velocity?: Vector2D;
  thrust?: Vector2D;
}

export class GameObjectWithPhysics extends GameObject {
  velocity: Vector2D;
  thrust: Vector2D;
  constructor({velocity, thrust, collidable, ...rest}: GameObjectWithPhysicsParameters) {
    super(rest);

    this.velocity = velocity || {x: 0, y: 0};
    this.thrust = thrust || {x: 0, y: 0};

    this.world.subscribeToUpdate((delta) => {
      this.pixiObject.x += this.velocity.x * delta;
      this.pixiObject.y += this.velocity.y * delta;
    });
  }

}
