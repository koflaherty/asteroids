import World from './engine/World.ts'
import { setupBackground } from './background.ts'
import { Asteroid } from './game-objects/Asteroid.ts'
import { Ship } from './game-objects/Ship.ts'


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

  // world.follow(bunny);


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

  const ship = new Ship({
    world,
    maxVelocity: 3,
    position: {
      x: 200,
      y: 200,
    },
    velocity: {
      x: 1,
      y: 1,
    },
    decay: 0.02,
  });

  ship.thrust = 0.1

  ship.pixiObject.rotation = Math.PI / -2

  ship.rotationTarget = {
    x: 1500,
    y: 1500,
  }
}
