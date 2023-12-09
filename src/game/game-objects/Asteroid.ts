import World from "../engine/World.ts";
import {Text, TextStyle, Container} from "pixi.js";
import { BACKGROUND_COLOR } from '../background.ts'
import { asteroidTextGeneration } from '../ascii-art/asteroidTextGeneration.ts'

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

export class Asteroid {
  constructor({world}: {
    world: World;
  }) {
    const container = new Container();
    const word = " ASTEROID ";
    const asciiText = asteroidTextGeneration(word);
    const asteroidText = asciiText.replace(word, " ".repeat(word.length));
    const nameText = asciiText.replace(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g, " ");


    console.log(nameText)

    const spriteAsteroid =  new Text(asteroidText, AsteroidTextStyles.purple);
    const spriteName =  new Text(nameText, AsteroidTextStyles.white);
    container.addChild(spriteAsteroid);
    container.addChild(spriteName);

    // setInterval(() => {
    //   spriteAsteroid.text = generateAsteroidASCII(" Asteroid ");
    // }, 1000);

    world.add(container);

    world.subscribeToUpdate(() => {
      container.position.x += 0.05;
      container.position.y += 0.05;
    })
  }
}
