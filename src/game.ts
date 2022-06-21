import * as PIXI from "pixi.js";
import fishImage from "./images/fish.png";
import bubbleImage from "./images/bubble.png";
import waterImage from "./images/water.jpg";
import sharkImage from "./images/shark.png"
import { Fish } from "./fish";
import { Shark } from "./shark";

export class Game {
  pixi: PIXI.Application;
  fishes: Fish[] = [];
  loader;
  constructor() {
    console.log("Game created");
    //
    // STAP 1 - maak een pixi canvas
    //
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    document.body.appendChild(this.pixi.view);

    //
    // STAP 2 - preload alle afbeeldingen
    //
    this.loader = new PIXI.Loader();
    this.loader
      .add("fishTexture", fishImage)
      .add("bubbleTexture", bubbleImage)
      .add("waterTexture", waterImage)
      .add("sharkTexture", );
    this.loader.load(() => this.loadCompleted());
  }
  //
  // STAP 3 - maak een sprite als de afbeeldingen zijn geladen
  //
  loadCompleted() {
    
    let background = new PIXI.Sprite(
      this.loader.resources["waterTexture"].texture!
    );
    background.scale.set(
      window.innerWidth / background.getBounds().width,
      window.innerHeight / background.getBounds().height
    );
    this.pixi.stage.addChild(background);

    for (let i = 0; i < 100; i++) {
      let fish = new Fish(this.loader.resources["fishTexture"].texture!, this);
      this.fishes.push(fish);
      this.pixi.stage.addChild(fish);
    }

    //create shark
    new Shark()

    this.pixi.ticker.add((delta: number) => this.update(delta));
  }
  update(delta: number) {
    for (const fish of this.fishes) {
      fish.update(delta);
    }
    console.log(this.pixi.stage.children.length);
    if (this.pixi.stage.children.length === 0) {
      console.log("YOU WIN");
      let text = new PIXI.Text("You WIN!!", { fill: ["#ffffff"] });
      text.x = 200;
      text.y = 200;
      this.pixi.stage.addChild(text);
    }
  }
  collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}

new Game();

