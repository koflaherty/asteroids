import { Vector2D } from './types.ts'

export const distanceBetweenVectors = (a: Vector2D, b: Vector2D) => {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function magnitudeOfVector2D(v: {x: number, y: number}): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export const createVector = (magnitude: number, angleInRadians: number): {x: number, y: number} => {
  return {
    x: magnitude * Math.cos(angleInRadians),
    y: magnitude * Math.sin(angleInRadians),
  };
};