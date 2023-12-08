import {Sprite, Text, TextStyle} from "pixi.js";
import World from '../engine/World.ts'
import TWEEN from '@tweenjs/tween.js'

const startTextStyle = new TextStyle({
  fontFamily: 'moby-monospace',
  fontSize: 12,
  fill: '#ffffff',
});

const randomishStarSprite = () => {
  const startType = Math.floor(Math.random() * 5);
  switch (startType) {
    case 0:
      return new Text('*', startTextStyle);
    case 1:
      return new Text('^', startTextStyle);
    case 2:
      return new Text('o', startTextStyle);
    case 3:
      return new Text('X', startTextStyle);
    case 4:
      return new Text('+', startTextStyle);
    default:
      return new Text('.', startTextStyle);
  }
}

export default class Star {
  baseAlpha: number;
  isTwinkling: boolean;
  sprite: Sprite;
  world: World;
  constructor({ x, y, world }: {
    x: number;
    y: number;
    world: World;
    twinkle?: boolean;
  }) {
    this.baseAlpha = Math.random() * 0.4 + 0.2;
    this.isTwinkling = false;
    this.world = world;
    this.sprite = randomishStarSprite();
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    // this.sprite.rotation = Math.random() * Math.PI * 2;
    this.sprite.scale.x = this.baseAlpha;
    this.sprite.scale.y = this.baseAlpha;
    this.sprite.alpha = this.baseAlpha;
    world.add(this.sprite);
  }

  twinkle() {
    if (this.isTwinkling) {
      return;
    }
    this.isTwinkling = true;
    const group = new TWEEN.Group();

    const unsub = this.world.subscribeToUpdate(() => {
      group.update();
    })

    const growTween = new TWEEN.Tween(this.sprite.scale, group) // Create a new tween that modifies 'coords'.
     .to({x: 1, y: 1}, 400) // Move to (300, 200) in 1 second.
     .easing(TWEEN.Easing.Bounce.InOut) // Use an easing function to make the animation smooth.
    const shrinkTween = new TWEEN.Tween(this.sprite.scale, group)
    .to({x: this.baseAlpha, y: this.baseAlpha}, 400)
    .onComplete(() => {
      this.isTwinkling = false;
      unsub();
      group.removeAll();
    });
    growTween.chain(shrinkTween)
    growTween.start();
  }
}
