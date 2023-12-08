import { Text, TextStyle } from 'pixi.js'
import World from '../engine/World.ts'
import TWEEN from '@tweenjs/tween.js'

const startTextStyle = new TextStyle({
  fontFamily: 'moby-monospace',
  fontSize: 16,
  fill: '#ffffff',
});

export default class Star {
  baseAlpha: number;
  constructor({ x, y, world }: {
    x: number;
    y: number;
    world: World;
  }) {
    this.baseAlpha = Math.random() * 0.5 + 0.1;
    const sprite = new Text('X', startTextStyle);
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.scale.x = this.baseAlpha;
    sprite.scale.y = this.baseAlpha;
    sprite.alpha = this.baseAlpha;
    world.add(sprite);

    const group = new TWEEN.Group();

    const growTween = new TWEEN.Tween(sprite.scale, group) // Create a new tween that modifies 'coords'.
      .to({x: 1, y: 1}, 400) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Bounce.InOut) // Use an easing function to make the animation smooth.

    const shrinkTween = new TWEEN.Tween(sprite.scale, group) // Create a new tween that modifies 'coords'.
      .to({x: this.baseAlpha, y: this.baseAlpha}, 400) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Bounce.InOut) // Use an easing function to make the animation smooth.

    growTween.chain(shrinkTween)


    setInterval(() => {
      growTween.start();
    }, Math.random() * 1000)


    world.subscribeToUpdate(() => {
      group.update();
    })
  }
}