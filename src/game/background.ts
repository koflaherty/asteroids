import World from './engine/World.ts'
import Star from './game-objects/Star.ts'

export const setupBackground = (world: World) => {
  const stars: Star[] = [];
  for (let i = 0; i < 1000; i++) {
    stars.push(new Star({
      world,
      x: Math.random() * world.viewport.worldWidth,
      y: Math.random() * world.viewport.worldHeight,
    }));
  }

  setInterval(() => {
    stars[Math.floor(Math.random() * stars.length)].twinkle();
  }, 100)
}
