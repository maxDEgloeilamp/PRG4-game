import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Shark extends PIXI.Sprite {
  private speedY: number = 0;
  private speedX: number = 0;
  private game: Game;
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;
    console.log("shark created");
    this.x = game.pixi.screen.width - this.getBounds().width;
    this.y = Math.random() * game.pixi.screen.height;
    this.scale.set(-1, 1);

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
  }

  onKeyDown(e: KeyboardEvent): any {
    if (e.key === "ArrowUp") {
      this.speedY = -5;
    }
    if (e.key === "ArrowDown") {
      this.speedY = 5;
    }
    if (e.key === "ArrowLeft") {
        this.speedX = -5;
      }
      if (e.key === "ArrowRight") {
        this.speedX = 5;
      }
    }
    // onKeyUp(e: KeyboardEvent): any {
    //   if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
    //     this.speedY = 0;
    //     this.speedX = 0;
    //   }
    // }
    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.speedX = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.speedY = 0
                break
        }
    }
    
    
    
    public update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      this.keepInScreen();
    }
    
  private keepInScreen() {
    if (this.getBounds().right < this.game.pixi.screen.left) {
      this.x = this.game.pixi.screen.right;
    }
  }
}






// Improved movement
    // onKeyDown(e: KeyboardEvent): void {
    //     switch (e.key.toUpperCase()) {

    //             break;
    //         case "A":
    //         case "ARROWLEFT":
    //             this.xspeed = -7
    //             break
    //         case "D":
    //         case "ARROWRIGHT":
    //             this.xspeed = 7
    //             break
    //         case "W":
    //         case "ARROWUP":
    //             this.yspeed = -7
    //             break
    //         case "S":
    //         case "ARROWDOWN":
    //             this.yspeed = 7
    //             break
    //     }
    // }

