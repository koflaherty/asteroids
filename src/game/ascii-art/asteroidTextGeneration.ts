// const ASTEROID_CHARACTERS = ['.', ',', '_', '.', '-', '.', ',', '_', '.', '-', '#'];

import { getWeightedRandomString } from './getRandomWeightedCharacter.ts'

const getRandomAsteroidCharacter = getWeightedRandomString([
  {weight: 1, value: "#"},
  {weight: 2, value: "%"},
  {weight: 2, value: "~"},
  {weight: 15, value: "_"},
  {weight: 15, value: "-"},
  {weight: 25, value: "."},
  {weight: 25, value: ","},
]);

export const asteroidTextGeneration = (word: string) => {
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

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}