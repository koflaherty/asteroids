import {Container, Text, TextStyle} from "pixi.js";
import {BACKGROUND_COLOR} from "../background.ts";
import {asteroidTextGeneration} from "../ascii-art/asteroidTextGeneration.ts";
import {GameObjectConstructorParameters} from "../engine/GameObject.ts";
import {GameObjectWithPhysics} from "../engine/GameObjectWithPhysics.ts";

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
    fill: "#FFFFFF",
  }),
  purple: new TextStyle({
    ...baseTextStyle,
    fill: "CC02FF",
  }),
};

export class Asteroid extends GameObjectWithPhysics {
  constructor(args: Omit<GameObjectConstructorParameters, "object">) {
    const container = new Container();
    const word = " ASTEROID ";
    const asciiText = asteroidTextGeneration(word);
    const asteroidText = asciiText.replace(word, " ".repeat(word.length));
    const nameText = asciiText.replace(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g, " ");

    const spriteAsteroid =  new Text(asteroidText, AsteroidTextStyles.purple);
    const spriteName =  new Text(nameText, AsteroidTextStyles.white);
    container.addChild(spriteAsteroid);
    container.addChild(spriteName);
    super({...args, object: container});
    this.velocity = {x: -0.3, y: -0.25};
    this.world.subscribeToUpdate(() => {
      const boundsCheck = this.checkBoundaries();
      if (!boundsCheck.outOfBounds) {
        return;
      }

      if (
        boundsCheck.x < 0 && this.velocity.x < 0 ||
        boundsCheck.x > 0 && this.velocity.x > 0
      ) {
        this.velocity.x = this.velocity.x * -1;
      }

      if (
        boundsCheck.y < 0 && this.velocity.y < 0 ||
        boundsCheck.y > 0 && this.velocity.y > 0
      ) {
        this.velocity.y = this.velocity.y * -1;
      }
    });
  }



}
