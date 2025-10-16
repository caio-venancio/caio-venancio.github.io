//Cena principal de jogo

import { GameState } from "../core/gamestate";

import { Scene } from 'phaser';

export class GameScene extends Scene {
  gs!: GameState;
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  background!: Phaser.GameObjects.Image;

  private accumulator = 0;
  private readonly fixedDt = 1 / 60; // 60 Hz lógico
  private speed = 150; // pixels / segundo

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

    if (!worldLayer) {
      throw new Error(
        "WorldLayer não retornado por map.createLayer"
      )
    }

    worldLayer.setCollisionByProperty({ collides: true });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    // 1) Estado lógico do jogo
    this.gs = new GameState();

    // 2) Sprite visual sincronizado com o estado
    // this.player = this.physics.add.sprite(this.gs.player.x, this.gs.player.y, "assets", "weirdsquare");
     this.player = this.physics.add
       .sprite(this.gs.player.x, this.gs.player.y, "assets", "weirdsquare");
      //  .setCollideWorldBounds(true);

    
    this.physics.add.collider(this.player, worldLayer);

    // this.background = this.add.image(400, 300, "assets");

  // 3) Input
  this.cursors = this.input.keyboard!.createCursorKeys();

    // 4) Câmera segue o sprite (opcional)
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setLerp(0.15, 0.15);

    // inicializa estado a partir da posição física
    this.gs.player.x = this.player.x;
    this.gs.player.y = this.player.y;
  }

  update(_time: number, deltaMs: number) {
    // Move o jogador usando o corpo físico para que colisões funcionem
    if (!this.player || !this.player.body) return;

    const speed = this.speed;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left?.isDown) vx = -speed;
    else if (this.cursors.right?.isDown) vx = speed;

    if (this.cursors.up?.isDown) vy = -speed;
    else if (this.cursors.down?.isDown) vy = speed;

    // usar o helper do Arcade Sprite
    this.player.setVelocity(vx, vy);

    // normalizar movimento diagonal
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.x !== 0 && body.velocity.y !== 0) {
      body.velocity.normalize().scale(speed);
    }

    // atualizar o estado lógico a partir da posição física (sincroniza)
    this.gs.player.x = this.player.x;
    this.gs.player.y = this.player.y;

    // debug rápido sobre colisões
    // console.debug('player.body.blocked:', body.blocked, 'touching:', body.touching);
  }
}
