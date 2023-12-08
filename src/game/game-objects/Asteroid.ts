import World from "../engine/World.ts";
import {Text, TextStyle} from "pixi.js";

const startTextStyle = new TextStyle({
  fontFamily: 'moby-monospace',
  fontSize: 14,
  fill: '#CC02FF',
  lineHeight: 21,
});
setTimeout(() => {
  startTextStyle.fill = "yellow";
}, 1000)

function generateAsteroidASCII(word) {
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
    let line = lines[i];
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Asteroid {
  constructor({world}: {
    world: World;
  }) {
    const asteroidText = generateAsteroidASCII('Asteroid');


    const word = " FRONT-END ";

    const sprite =  new Text(asteroidText, startTextStyle);

    setInterval(() => {
      sprite.text = generateAsteroidASCII(word);
    }, 1000);

    world.add(sprite);
  }
}
