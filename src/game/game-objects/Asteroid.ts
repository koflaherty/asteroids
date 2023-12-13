import { Container, Rectangle, Text, TextStyle } from 'pixi.js'
import { BACKGROUND_COLOR } from '../background.ts'
import { asteroidTextGeneration } from '../ascii-art/asteroidTextGeneration.ts'
import { CollisionBox, GameObjectConstructorParameters } from '../engine/GameObject.ts'
import { GameObjectWithPhysics } from '../engine/GameObjectWithPhysics.ts'
import { Collidable } from '../engine/CollisionDetector.ts'

const baseTextStyle = {
  fontFamily: 'moby-monospace',
  fontSize: 14,
  fill: '#FFFFFF',
  lineHeight: 21,
  stroke: BACKGROUND_COLOR,
  strokeThickness: 6,
}

const AsteroidTextStyles = {
  white: new TextStyle({
    ...baseTextStyle,
    fill: '#FFFFFF',
  }),
  purple: new TextStyle({
    ...baseTextStyle,
    fill: 'CC02FF',
  }),
}

const generateAsteroidText = (word: string) => {
  const asciiText = asteroidTextGeneration(word)
  const asteroidText = asciiText.replace(word, ' '.repeat(word.length))
  const nameText = asciiText.replace(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g, ' ')

  return {
    nameText,
    asteroidText,
  }
}

interface AsteroidConstructorParameters extends Omit<GameObjectConstructorParameters, 'pixiObject'> {
  word: string;
}

export class Asteroid extends GameObjectWithPhysics {
  asteroidRockText: Text
  asteroidCoreText: Text
  word: string

  constructor(args: AsteroidConstructorParameters) {
    const container = new Container()
    const word = args.word
    const { nameText, asteroidText } = generateAsteroidText(word)
    const spriteAsteroidRock = new Text(asteroidText, AsteroidTextStyles.purple)
    const spriteCore = new Text(nameText, AsteroidTextStyles.white)
    container.addChild(spriteAsteroidRock)
    container.addChild(spriteCore)
    super({ ...args, pixiObject: container })
    this.asteroidRockText = spriteAsteroidRock
    this.asteroidCoreText = spriteCore
    this.velocity = { x: -0.3, y: -0.25 }
    this.word = word
    this.addCollidable({
      object: this,
      type: 'asteroid',
      collidesWith: ['asteroid', "laser", "ship"],
    })

    this.world.subscribeToUpdate(() => {
      const boundsCheck = this.checkBoundaries()
      if (!boundsCheck.outOfBounds) {
        return
      }

      if (
        boundsCheck.x < 0 && this.velocity.x < 0 ||
        boundsCheck.x > 0 && this.velocity.x > 0
      ) {
        this.velocity.x = this.velocity.x * -1
      }

      if (
        boundsCheck.y < 0 && this.velocity.y < 0 ||
        boundsCheck.y > 0 && this.velocity.y > 0
      ) {
        this.velocity.y = this.velocity.y * -1
      }
    })
  }

  onCollision(_collidable: Collidable, _boxes: CollisionBox[][]) {
    const {text} = this.breakTextObject(this.asteroidRockText.text);
    _boxes.forEach((boxes) => {
      console.log(boxes.map(box => box.info?.object.word))
      boxes.forEach((box) => {
        if (box.info?.object === this && typeof box.info?.row === "number" && typeof box.info?.column === "number") {
          text[box.info?.row][box.info?.column] = " ";
        }
      })
    });

    if (_collidable.type !== "laser") {
      this.velocity.x *= -1
      this.velocity.y *= -1
    }

    setTimeout(() => this.asteroidRockText.text = this.combineTextObject(text), 5);
  }

  getCollisionBoxes(): CollisionBox[] {
    const boxes: CollisionBox[] = []
    const { text, width, height } = this.breakTextObject(this.asteroidRockText.text)
    const boxWidth = this.asteroidRockText.width / width
    const boxHeight = this.asteroidRockText.height / height
    const padding = boxWidth / 3;
    text.forEach((line, row) => {
      line.forEach((letter, column) => {
        if (letter === ' ') return
        boxes.push({
          box: new Rectangle(
            this.pixiObject.x + padding + column * boxWidth,
            this.pixiObject.y + padding + row * boxHeight,
            boxWidth - padding * 2,
            boxHeight - padding * 2,
          ),
          info: {
            object: this,
            row,
            column,
            letterCount: row + column + (2 * row),
            word: this.word,
            letter,
          },
        })
      })
    })
    return boxes
  }

  breakTextObject(text: string) {
    let maxWidth = 0
    const text2d = text.split('\n').map(s => {
      const textRow = s.split('')
      if (maxWidth < textRow.length) maxWidth = textRow.length
      return textRow
    })

    return {
      text: text2d,
      width: maxWidth,
      height: text2d.length,
    }
  }

  combineTextObject(text: string[][]) {
    let output = '';
    for (let row = 0; row < text.length; row++) {
      for (let column = 0; column < text[row].length; column++) {
        output += text[row][column];
      }
      output += '\n';
    }
    return output;
  }

}
