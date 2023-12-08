import { Text, TextStyle } from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'
import { GameObject, GameObjectConstructorParameters } from './GameObject.ts'

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


export default class Star extends GameObject {
  baseAlpha: number;
  isTwinkling: boolean;
  // sprite: Sprite;
  constructor({ position, world }: Omit<GameObjectConstructorParameters, "object">) {
    const sprite = randomishStarSprite();
    const baseAlpha = Math.random() * 0.4 + 0.2;
    sprite.anchor.set(0.5);
    sprite.scale.x = baseAlpha;
    sprite.scale.y = baseAlpha;
    sprite.alpha = baseAlpha;
    super({
      object: sprite,
      world,
      position,
    });
    this.baseAlpha = Math.random() * 0.4 + 0.2;
    this.isTwinkling = false;
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

    const growTween = new TWEEN.Tween(this.object.scale, group) // Create a new tween that modifies 'coords'.
     .to({x: 1, y: 1}, 400) // Move to (300, 200) in 1 second.
     .easing(TWEEN.Easing.Bounce.InOut) // Use an easing function to make the animation smooth.
    const shrinkTween = new TWEEN.Tween(this.object.scale, group)
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
