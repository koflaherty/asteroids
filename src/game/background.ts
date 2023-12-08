import World from './engine/World.ts'
import Star from './game-objects/Star.ts'

export const BACKGROUND_COLOR = "#160F21";

export const setupBackground = (world: World) => {
  const stars: Star[] = [];
  for (let i = 0; i < 800; i++) {
    stars.push(new Star({
      world,
      position: {
        x: Math.random() * world.viewport.worldWidth,
        y: Math.random() * world.viewport.worldHeight,
      }
    }));
  }

  setInterval(() => {
    stars[Math.floor(Math.random() * stars.length)].twinkle();
  }, 50)
}
