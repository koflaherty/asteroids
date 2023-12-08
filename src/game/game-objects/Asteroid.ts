import World from "../engine/World.ts";
import {Text, TextStyle, Container} from "pixi.js";
import { BACKGROUND_COLOR } from '../background.ts'

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

function generateAsteroidASCII(word: string) {
  const lines = [];
  const maxLength = Math.max(word.length + 8, 12); // Ensure the asteroid is wide enough
  const halfHeight = Math.ceil(maxLength / 4);
  const middleWidth = word.length + 4; // Width of the asteroid at the middle line

  // Generate the top half of the asteroid
  for (let i = 0; i < halfHeight; i++) {
    let line = '';
    let lineLength = i === halfHeight - 1 ? middleWidth : maxLength - 2 * (halfHeight - i - 1) + getRandomInt(-2, 2);
    let padding = (maxLength - lineLength) / 2;
    for (let j = 0; j < padding; j++) line += ' ';
    for (let j = 0; j < lineLength; j++) line += getRandomAsteroidCharacter();
    lines.push(line);
  }

  // Insert the word in the middle
  let middleLine = '';
  const middlePadding = (maxLength - word.length) / 2;
  for (let i = 0; i < middlePadding; i++) {
    middleLine += getRandomAsteroidCharacter();
  }
  middleLine += word;
  for (let i = 0; i < middlePadding; i++) {
    middleLine += getRandomAsteroidCharacter();
  }
  // middleLine = '.'.repeat(middlePadding) + word + '.'.repeat(middlePadding);
  lines[halfHeight - 1] = middleLine;

  // Generate the bottom half of the asteroid
  for (let i = halfHeight - 2; i >= 0; i--) {
    // Introduce defects in the bottom half as well
    let line: string = lines[i];
    if (i !== halfHeight - 2 && getRandomInt(0, 1) === 1) { // Avoid changing the line adjacent to the middle
      // Either add a character at the end or remove one
      line = getRandomInt(0, 1) === 1 ? line + getRandomAsteroidCharacter() : line.slice(0, -1);
    }
    lines.push(line);
  }

  return lines.join('\n');
}

function getRandomAsteroidCharacter() {
  const chars = ['.', ',', '_', '.', '-', '#'];
  return chars[Math.floor(Math.random() * chars.length)];
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Asteroid {
  constructor({world}: {
    world: World;
  }) {
    const container = new Container();
    const word = " ASTEROID ";
    const asciiText = generateAsteroidASCII(word);
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
