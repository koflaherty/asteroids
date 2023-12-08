import World from './engine/World.ts'
import { Sprite } from 'pixi.js'
const bunny = Sprite.from('https://pixijs.com/assets/bunny.png')
export function setupGame(element: HTMLDivElement) {
  const world = new World({
    mountToElement: element,
    backgroundColor: '#000000',
    size: {
      x: 3000,
      y: 3000,
    },
  });
  // activate plugins

  bunny.anchor.set(0.5)
  // move the sprite to the center of the screen
  bunny.x = 1500
  bunny.y = 1500
  world.add(bunny);
  world.follow(bunny);
}
