import World from './engine/World.ts'
import { Sprite } from 'pixi.js'
import { setupBackground } from './background.ts'
import {Asteroid} from "./game-objects/Asteroid.ts";
const bunny = Sprite.from('https://pixijs.com/assets/bunny.png')
export function setupGame(element: HTMLDivElement) {
  const world = new World({
    mountToElement: element,
    backgroundColor: '#160F21',
    size: {
      x: 3000,
      y: 3000,
    },
  });

  // enable Tween

  // activate plugins


  bunny.anchor.set(0.5)
  // move the sprite to the center of the screen
  bunny.x = 1500
  bunny.y = 1500
  world.add(bunny);
  // world.follow(bunny);
  world.subscribeToUpdate(() => {
    bunny.rotation += 0.1;
  })

  // Set up scene
  setupBackground(world);
  new Asteroid({
    world,
    word: " Portfolio ",
  })

  new Asteroid({
    world,
    word: " Email ",
    position: {
      x: 600,
      y: 200,
    }
  })

  new Asteroid({
    world,
    word: " Kevin O'Flaherty ",
    position: {
      x: 300,
      y: 300,
    },
  })
}
