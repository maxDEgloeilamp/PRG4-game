import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Fish extends PIXI.Sprite {
  private game: Game;
  private speed: number = 0;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;

    this.speed = Math.random() * 6 + 1;
    this.x = Math.random() * game.pixi.screen.right;
    this.y = Math.random() * game.pixi.screen.bottom;

    this.tint = Math.random() * 0xffffff;
    this.scale.set(-1, 1);

    this.interactive = true;
    this.on("pointerdown", () => this.onClick());
  }

  private onClick() {
    console.log("Click");
    this.game.pixi.stage.removeChild(this);
  }

  public update(delta: number) {
    this.x += this.speed * delta;
    this.y += Math.sin(this.x * 0.02) * 2;

    this.keepInScreen();
  }

  private keepInScreen() {
    if (this.getBounds().left > this.game.pixi.screen.right) {
      this.x = -this.getBounds().width;
    }
  }
}

// import * as PIXI from "pixi.js";

// export class Fish extends PIXI.Sprite {
//   constructor(texture: PIXI.Texture) {
//     super(texture);

//     this.x = Math.random() * this.pixi.screen.right;
//     this.y = Math.random() * this.pixi.screen.bottom;
//     //fish.rotation = 0.3
//     this.fish.anchor.set(0.5);
//     this.fish.scale.set(1);
//     window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
//     window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
//   }

//   onKeyDown(e: KeyboardEvent): any {
//     console.log(e.key);
//     if (e.key == "ArrowRight") {
//       this.x += 3;
//     }
//   }
//   onKeyUp(e: KeyboardEvent): any {}
// }
