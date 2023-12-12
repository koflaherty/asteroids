import { Sprite } from 'pixi.js'
import { GameObjectWithPhysics, GameObjectWithPhysicsParameters } from '../engine/GameObjectWithPhysics.ts'




export class Ship extends GameObjectWithPhysics {
  constructor(args: Omit<GameObjectWithPhysicsParameters, 'pixiObject'>) {
    const ship = Sprite.from('/assets/ship.png')
    ship.anchor.set(0.5)

    super({
    ...args,
      pixiObject: ship,
    })
  }
}