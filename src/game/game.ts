import World from './engine/World.ts'
import { setupBackground } from './background.ts'
import { Asteroid, ASTEROID_COLORS, AsteroidConstructorParameters } from './game-objects/Asteroid.ts'
import { Ship } from './game-objects/Ship.ts'
import { incrementScore } from '../ui/score/score.ts'
import { Bonus } from '../ui/bonuses/types.ts'
import { bonusFound } from '../ui/bonuses/bonuses.ts'

let world: World

export function setupGame(element: HTMLDivElement) {
  world = new World({
    mountToElement: element,
    backgroundColor: '#160F21',
    size: {
      x: 3000,
      y: 3000,
    },
  })
  setupBackground(world)

  const ship = new Ship({
    world,
    maxVelocity: 2.5,
    position: {
      x: 800,
      y: 900,
    },
    decay: 0.05,
  })
  world.follow(ship.pixiObject)
  ship.pixiObject.rotation = Math.PI / -2

  return world
}

export const startGame = () => {
  if (!world) {
    console.warn('World has not been initialized')
    return
  }

  generateAsteroid({
    world,
    word: ' Portfolio ',
    color: ASTEROID_COLORS.RED,
  })

  generateAsteroid({
    world,
    word: ' Email ',
    color: ASTEROID_COLORS.GREEN,
    position: {
      x: 600,
      y: 200,
    },
  }, {
    title: 'EMAIL',
    icon: 'email',
    description: 'kevin@oflaherty.tech',
    url: 'mailto:kevin@oflaherty.tech',
  })

  generateAsteroid({
    world,
    word: ' Kevin O\'Flaherty ',
    color: ASTEROID_COLORS.BLUE,
    position: {
      x: 300,
      y: 300,
    },
    onDestroyed: (asteroid: Asteroid) => {
      generateAsteroid({
        world,
        word: ' Email2 ',
        color: ASTEROID_COLORS.BLUE,
        position: {
          x: asteroid.pixiObject.x,
          y: asteroid.pixiObject.y,
        },
      })
    },
  })
}

const generateAsteroid = (args: AsteroidConstructorParameters, bonus?: Bonus) => {
  return new Asteroid({
    ...args,
    onDestroyed: (asteroid) => {
      incrementScore()
      if (args.onDestroyed) {
        args.onDestroyed(asteroid)
      }

      if (bonus) {
        bonusFound(bonus)
      }
    },
  })
}