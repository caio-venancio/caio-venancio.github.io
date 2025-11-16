import Phaser from "phaser";
import { GameScene } from "../scenes/GameScene";

export function setupCamera(scene: GameScene){
    //não usa gs, vai virar variável local
    // 4) Câmera segue o sprite (opcional)
    scene.cameras.main.startFollow(scene.player);
    scene.cameras.main.setLerp(0.15, 0.15);
 }