import { GameScene } from "../scenes/GameScene";

export function setupInput(scene: GameScene){
    //não usa gs, vai virar variável local
    // 3) Input
    scene.cursors = scene.input.keyboard!.createCursorKeys();
  }