//Cena principal de jogo

import { GameState } from "../core/gamestate";

import { Scene } from 'phaser';

export class GameScene extends Scene {
  gs!: GameState;
  player!: Phaser.GameObjects.Sprite; // sprite simples (sem Arcade Physics)
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  background!: Phaser.GameObjects.Image;

  private accumulator = 0;
  private readonly fixedDt = 1 / 60; // 60 Hz lógico

  constructor() {
    super({ key: "rpg" });
  }

  preload() {
    // this.load.setBaseURL("https://cdn.phaserfiles.com/v385");
    // this.load.atlas("assets", "assets/games/breakout/breakout.png", "assets/games/breakout/breakout.json");
    this.load.image("tiles", "/assets/tiles/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "/assets/maps/tuxemon-town.json");

  }

  create() {
     // 1) criar o tilemap a partir do JSON
    const map = this.make.tilemap({ key: "map" });

    // debug: listar tilesets presentes no JSON
    console.debug("map.tilesets:", map.tilesets.map(ts => ts.name));

    // tenta usar o nome esperado; se não existir, usa o primeiro tileset do JSON
    let tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    if (!tileset && map.tilesets.length > 0) {
      const fallbackName = map.tilesets[0].name;
      console.warn(
        `Tileset 'tuxmon-sample-32px' não encontrado no map.json — usando '${fallbackName}' como fallback`
      );
      tileset = map.addTilesetImage(fallbackName, "tiles");
    }

    if (!tileset) {
      throw new Error(
        "Tileset não encontrado: verifique o nome do tileset no JSON e a chave do asset carregado."
      );
    }

    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

    // 1) Estado lógico do jogo
    this.gs = new GameState();

    // 2) Sprite visual sincronizado com o estado
    this.player = this.add.sprite(this.gs.player.x, this.gs.player.y, "assets", "weirdsquare");
    this.background = this.add.image(400, 300, "assets");

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
