import World from '../engine/World.ts'
import { Container, Sprite } from 'pixi.js'

// ConstructorParameters<typeof SomeClass>

type Position = {
  x: number;
  y: number;
}

export interface GameObjectConstructorParameters {
  object: Sprite | Container;
  world: World;
  position?: Position;
}

export class GameObject {
  object: Sprite | Container;
  world: World;
  constructor(args: GameObjectConstructorParameters) {
    this.world = args.world;
    this.object = args.object;

    if (args.position) {
      this.object.x = args.position.x;
      this.object.y = args.position.y;
    }
    this.world.add(this.object);
  }
}