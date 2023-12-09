import { GameObject, GameObjectConstructorParameters } from './GameObject.ts'
import { Point2D, Vector2D } from './types.ts'

interface GameObjectWithPhysics extends GameObjectConstructorParameters {
  position?: Point2D;
  velocity?: Vector2D;
  thrust?: Vector2D;
}

class GameObjectWithPhysics extends GameObject {
  constructor(args: GameObjectConstructorParameters) {

  }

}