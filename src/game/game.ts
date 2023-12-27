import World from './engine/World.ts'
import { setupBackground } from './background.ts'
import {Asteroid, ASTEROID_COLORS, AsteroidConstructorParameters} from "./game-objects/Asteroid.ts";
import { Ship } from './game-objects/Ship.ts'
import {incrementScore} from "../ui/score/score.ts";

const generateAsteroid = (args: AsteroidConstructorParameters) => {
  return new Asteroid({
    ...args,
    onDestroyed: (asteroid) => {
      incrementScore();
      if (args.onDestroyed) {
        args.onDestroyed(asteroid);
      }
    }
  });
}

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


  // Set up scene
  setupBackground(world);
  generateAsteroid({
    world,
    word: " Portfolio ",
    color: ASTEROID_COLORS.RED,
  })

  generateAsteroid({
    world,
    word: " Email ",
    color: ASTEROID_COLORS.GREEN,
    position: {
      x: 600,
      y: 200,
    }
  })

  generateAsteroid({
    world,
    word: " Kevin O'Flaherty ",
    color: ASTEROID_COLORS.BLUE,
    position: {
      x: 300,
      y: 300,
    },
    onDestroyed: (asteroid: Asteroid) => {
      generateAsteroid({
        world,
        word: " Email2 ",
        color: ASTEROID_COLORS.BLUE,
        position: {
          x: asteroid.pixiObject.x,
          y: asteroid.pixiObject.y,
        }
      })
    }
  })

  const ship = new Ship({
    world,
    maxVelocity: 2.5,
    position: {
      x: 800,
      y: 900,
    },
    decay: 0.05,
  });
  world.follow(ship.pixiObject);
  ship.pixiObject.rotation = Math.PI / -2
}
