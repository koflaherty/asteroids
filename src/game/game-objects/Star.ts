import { Text, TextStyle } from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'
import { GameObject, GameObjectConstructorParameters } from '../engine/GameObject.ts'

import { getWeightedRandomString } from '../ascii-art/getRandomWeightedCharacter.ts'

const getRandomStarText = getWeightedRandomString([
  {weight: 2, value: "*"},
  {weight: 3, value: "^"},
  {weight: 1, value: "o"},
  {weight: 1, value: "X"},
  {weight: 3, value: "+"},
  {weight: 3, value: "."},
]);


const startTextStyle = new TextStyle({
  fontFamily: 'moby-monospace',
  fontSize: 12,
  fill: '#ffffff',
});

export default class Star extends GameObject {
  baseAlpha: number;
  isTwinkling: boolean;
  // sprite: Sprite;
  constructor({ position, world }: Omit<GameObjectConstructorParameters, "pixiObject">) {
    const sprite = new Text(getRandomStarText(), startTextStyle);
    const baseAlpha = Math.random() * 0.4 + 0.2;
    sprite.anchor.set(0.5);
    sprite.scale.x = baseAlpha;
    sprite.scale.y = baseAlpha;
    sprite.alpha = baseAlpha;
    super({
      pixiObject: sprite,
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

    const growTween = new TWEEN.Tween(this.pixiObject.scale, group) // Create a new tween that modifies 'coords'.
     .to({x: 1, y: 1}, 400) // Move to (300, 200) in 1 second.
     .easing(TWEEN.Easing.Bounce.InOut) // Use an easing function to make the animation smooth.
    const shrinkTween = new TWEEN.Tween(this.pixiObject.scale, group)
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
