import { Sprite } from 'pixi.js'
import { GameObjectWithPhysics, GameObjectWithPhysicsParameters } from '../engine/GameObjectWithPhysics.ts'
import { Vector2D } from '../engine/types.ts'
import { distanceBetweenVectors, magnitudeOfVector2D } from '../engine/helpers.ts'
import { CollisionBox, GameObject } from '../engine/GameObject.ts'
import { Laser } from './Laser.ts'
import { Collidable } from '../engine/CollisionDetector.ts'

const FIREING_DELAY = {
  initial: 300,
  betweenAttacks: 300,
}

export class Ship extends GameObjectWithPhysics {
  attacking: GameObject | null
  targetPosition: Vector2D | null
  firing: boolean

  constructor(args: Omit<GameObjectWithPhysicsParameters, 'pixiObject'>) {
    const ship = Sprite.from('/assets/ship.png')
    ship.anchor.set(0.5)

    super({
      ...args,
      pixiObject: ship,
    })
    this.rotationTarget = { x: 0, y: 0 }
    this.addCollidable({
      object: this,
      type: 'ship',
      collidesWith: ['asteroid'],
    })
    this.firing = false
    this.targetPosition = null
    this.attacking = null

    this.world.subscribeToUpdate(() => {
      const shipRect = this.rect()
      if (this.targetPosition && distanceBetweenVectors({ x: shipRect.x, y: shipRect.y }, this.targetPosition) < 66) {
        this.targetPosition = null
      }

      if (this.attacking) {
        this.rotationTarget = { x: this.attacking.pixiObject.x, y: this.attacking.pixiObject.y }
        this.thrust = 0
      } else if (this.targetPosition) {
        // Direction to the target
        let dx = this.targetPosition.x - shipRect.x
        let dy = this.targetPosition.y - shipRect.y

        // Distance to the target
        let distanceToTarget = Math.sqrt(dx * dx + dy * dy)

        // Predictive offset, proportional to velocity and distance
        let offsetMagnitude = magnitudeOfVector2D(this.velocity) * distanceToTarget * 0.005 // adjust the coefficient as needed

        // Calculate the offset
        let offsetX = this.velocity.x * offsetMagnitude
        let offsetY = this.velocity.y * offsetMagnitude

        this.rotationTarget = {
          x: this.targetPosition.x + offsetX,
          y: this.targetPosition.y + offsetY,
        }
        this.thrust = 0.2
      } else {
        this.rotationTarget = null
        this.thrust = 0
      }
    })

    // Check for clicks
    this.world.mountToElement.addEventListener('click', (e) => {
      const clickPosition = {
        x: e.clientX - this.world.viewport.x,
        y: e.clientY - this.world.viewport.y,
      }
      const clickedOnCollidable = this.world.collisionDetector.checkClickedOn({
        x: e.clientX - this.world.viewport.x,
        y: e.clientY - this.world.viewport.y,
      })

      if (clickedOnCollidable?.type === 'asteroid') {
        this.attacking = clickedOnCollidable.object
        if (!this.firing) {
          this.firing = true
          setTimeout(() => this.fire(), FIREING_DELAY.initial)
        }
      } else {
        this.attacking = null
        this.moveTo(clickPosition)
      }
    })
  }

  moveTo(position: Vector2D) {
    this.targetPosition = position
  }

  onCollision(_collidable: Collidable, _boxes: CollisionBox[][]) {
    this.velocity.x *= -1
    this.velocity.y *= -1
    this.targetPosition = null
  }

  fire() {
    if (!this.attacking) {
      this.firing = false
      return
    }

    new Laser({
      ship: this,
    })

    setTimeout(() => this.fire(), FIREING_DELAY.betweenAttacks)
  }
}