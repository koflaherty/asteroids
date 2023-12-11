import { Text } from 'pixi.js'
import { BACKGROUND_COLOR } from '../background.ts'
import { GameObjectWithPhysics, GameObjectWithPhysicsParameters } from '../engine/GameObjectWithPhysics.ts'

export class Ship extends GameObjectWithPhysics {
  constructor(args: Omit<GameObjectWithPhysicsParameters, 'pixiObject'>) {
    const sprite = new Text("^", {
      fontFamily: 'moby-monospace',
      fontSize: 28,
      fill: '#FFFFFF',
      lineHeight: 28,
      stroke: BACKGROUND_COLOR,
      strokeThickness: 6,
    })
    super({
    ...args,
      pixiObject: sprite,
    })
  }
}