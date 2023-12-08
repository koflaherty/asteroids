import World from './engine/World.ts'
import Star from './game-objects/Star.ts'

export const setupBackground = (world: World) => {
  for (let i = 0; i < 2000; i++) {
    new Star({
      world,
      x: Math.random() * world.viewport.worldWidth,
      y: Math.random() * world.viewport.worldHeight,
    })
  }
}
