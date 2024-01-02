import World from './engine/World.ts'
import { setupBackground } from './background.ts'
import { Asteroid, ASTEROID_COLORS, AsteroidConstructorParameters } from './game-objects/Asteroid.ts'
import { Ship } from './game-objects/Ship.ts'
import { incrementScore } from '../ui/score/score.ts'
import { Bonus } from '../ui/bonuses/types.ts'
import { bonusFound } from '../ui/bonuses/bonuses.ts'
import { ASTEROID_CONTENT, BONUSES } from '../content.ts'

let world: World

export function setupGame(element: HTMLDivElement) {
  world = new World({
    mountToElement: element,
    backgroundColor: '#160F21',
    size: {
      x: Math.max(2000, window.innerWidth),
      y: Math.max(2000, window.innerHeight),
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

  spawnPersonalAsteroid();
  spawnSideProjectAsteroid();
  spawnARAsteroid();
  spawnWebAppAsteroid();
  spawnAgileAsteroid();
  spawnPrototypingAsteroid();
}

const generateAsteroid = (args: AsteroidConstructorParameters, bonus?: Bonus) => {
  return new Asteroid({
    ...args,
    word: ` ${args.word} `,
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

const spawnPersonalAsteroid = () => {
  const color = ASTEROID_COLORS.BLUE;
  generateAsteroid({
    world,
    word: ASTEROID_CONTENT.NAME,
    color: color,
    position: {
      x: 600,
      y: 300,
    },
    velocity: {
      x: 0.24,
      y: 0.125,
    },
    onDestroyed: (asteroid: Asteroid) => {
      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.EMAIL,
        color: color,
        position: {
          x: asteroid.pixiObject.x,
          y: asteroid.pixiObject.y + 20,
        },
        velocity: {
          x: -0.2,
          y: -0.1,
        }
      }, BONUSES.EMAIL);

      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.GITHUB,
        color: color,
        position: {
          x: asteroid.pixiObject.x + 215,
          y: asteroid.pixiObject.y + 160,
        },
        velocity: {
          x: 0.2,
          y: -0.1,
        }
      }, BONUSES.GITHUB);

      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.RESUME,
        color: color,
        position: {
          x: asteroid.pixiObject.x + 5,
          y: asteroid.pixiObject.y + 190,
        },
        velocity: {
          x: -0.15,
          y: 0.1,
        }
      }, BONUSES.RESUME);
    },
  });
}

const spawnSideProjectAsteroid = () => {
  generateAsteroid({
    world,
    word: ASTEROID_CONTENT.SPOOL,
    color: ASTEROID_COLORS.YELLOW,
    position: {
      x: 400,
      y: 1200,
    },
    velocity: {
      x: -0.115,
      y: -0.167,
    }
  }, BONUSES.SPOOL);
}

const spawnARAsteroid = () => {
  const color = ASTEROID_COLORS.GREEN;
  generateAsteroid({
    world,
    word: ASTEROID_CONTENT.AR,
    color: color,
    position: {
      x: 980,
      y: 1320,
    },
    velocity: {
      x: 0.115,
      y: 0.065,
    },
    onDestroyed: (asteroid) => {
      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.AR_8TH_WALL,
        color: color,
        position: {
          x: asteroid.pixiObject.x + 230,
          y: asteroid.pixiObject.y + 100,
        },
        velocity: {
          x: 0.2,
          y: -0.13,
        },
      });

      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.AR_THREE_JS,
        color: color,
        position: {
          x: asteroid.pixiObject.x,
          y: asteroid.pixiObject.y + 200,
        },
        velocity: {
          x: -0.2,
          y: 0.112,
        },
      });

      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.AR_UNITY,
        color: color,
        position: {
          x: asteroid.pixiObject.x,
          y: asteroid.pixiObject.y + 20,
        },
        velocity: {
          x: -0.2,
          y: -0.1,
        },
        onDestroyed: (asteroid: Asteroid) => {
          generateAsteroid({
            world,
            word: ASTEROID_CONTENT.AR_UNITY_PERSONAS,
            color: color,
            position: {
              x: asteroid.pixiObject.x + 50,
              y: asteroid.pixiObject.y + 50,
            },
            velocity: {
              x: 0.2,
              y: -0.1,
            }
          }, BONUSES.AR_PERSONAS_VIDEO);
        }
      });
    }
  });
}

const spawnWebAppAsteroid = () => {
  const color = ASTEROID_COLORS.PURPLE;
  generateAsteroid({
    world,
    word: ASTEROID_CONTENT.WEB_APPS,
    color: color,
    position: {
      x: 120,
      y: 520,
    },
    velocity: {
      x: 0.1,
      y: 0.08,
    },
    onDestroyed: (asteroid) => {
      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.WEB_APPS_TRANSITION_CHECK,
        color: color,
        position: {
          x: asteroid.pixiObject.x + 30,
          y: asteroid.pixiObject.y + 30,
        },
        velocity: {
          x: 0.2,
          y: -0.13,
        },
      }, BONUSES.TRANSITION_CHECK_VIDEO);
    }
  });
}

const spawnAgileAsteroid = () => {
  const color = ASTEROID_COLORS.RED;
  generateAsteroid({
    world,
    word: ASTEROID_CONTENT.AGILE,
    color: color,
    position: {
      x: 1400,
      y: 650,
    },
    velocity: {
      x: 0.095,
      y: 0.075,
    },
    onDestroyed: (asteroid) => {
      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.AGILE_KANBAN,
        color: color,
        position: {
          x: asteroid.pixiObject.x,
          y: asteroid.pixiObject.y - 45,
        },
        velocity: {
          x: -0.18,
          y: -0.13,
        },
      });

      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.AGILE_SCRUM,
        color: color,
        position: {
          x: asteroid.pixiObject.x + 180,
          y: asteroid.pixiObject.y + 70,
        },
        velocity: {
          x: 0.17,
          y: 0.11,
        },
      });
    }
  });
}

const spawnPrototypingAsteroid = () => {
  const color = ASTEROID_COLORS.PINK;
  generateAsteroid({
    world,
    word: ASTEROID_CONTENT.PROTOTYPING,
    color: color,
    position: {
      x: 1670,
      y: 1200,
    },
    velocity: {
      x: -0.08,
      y: -0.03,
    },
    onDestroyed: (asteroid) => {
      generateAsteroid({
        world,
        word: ASTEROID_CONTENT.PROTOTYPING_SAMPLE,
        color: color,
        position: {
          x: asteroid.pixiObject.x,
          y: asteroid.pixiObject.y,
        },
        velocity: {
          x: -0.18,
          y: -0.13,
        },
      }, BONUSES.PROTOTYPE_VIDEO);
    }
  });
}