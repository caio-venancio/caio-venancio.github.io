//Cena principal de jogo

import { GameState } from "../core/gamestate";

import { Scene } from 'phaser';

export class GameScene extends Scene {
  gs!: GameState;
  player!: Phaser.GameObjects.Sprite; // sprite simples (sem Arcade Physics)
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private accumulator = 0;
  private readonly fixedDt = 1 / 60; // 60 Hz lógico

  constructor() {
    super({ key: "rpg" });
  }

  preload() {
    this.load.setBaseURL("https://cdn.phaserfiles.com/v385");
    this.load.atlas("assets", "assets/games/breakout/breakout.png", "assets/games/breakout/breakout.json");
  }

  create() {
    // 1) Estado lógico do jogo
    this.gs = new GameState();

    // 2) Sprite visual sincronizado com o estado
    this.player = this.add.sprite(this.gs.player.x, this.gs.player.y, "assets", "weirdsquare");

    // 3) Input
    this.cursors = this.input.keyboard!.createCursorKeys();

    // 4) Câmera segue o sprite (opcional)
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setLerp(0.15, 0.15);
  }

  update(_time: number, deltaMs: number) {
    // A) Coletar input da engine → DTO leve
    const input = {
      up: !!this.cursors.up?.isDown,
      down: !!this.cursors.down?.isDown,
      left: !!this.cursors.left?.isDown,
      right: !!this.cursors.right?.isDown,
    };

    // B) Fixed timestep para estabilidade/determinismo
    this.accumulator += deltaMs / 1000;
    while (this.accumulator >= this.fixedDt) {
      this.gs.update(input, this.fixedDt); // core decide novas posições
      this.accumulator -= this.fixedDt;
    }

    // C) Render: refletir o estado no sprite
    this.player.setPosition(this.gs.player.x, this.gs.player.y);
  }
}
