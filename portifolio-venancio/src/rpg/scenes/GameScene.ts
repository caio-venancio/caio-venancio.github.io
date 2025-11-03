//Cena principal de jogo

import { GameState } from "../core/gamestate";
import { EventBus } from '../EventBus'

import { Scene } from 'phaser';

export class GameScene extends Scene {
  gs!: GameState;
  player!: Phaser.Physics.Arcade.Sprite;
  npc!: Phaser.Physics.Arcade.Sprite;
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
    this.load.spritesheet('dude', 
        '/assets/sprites/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

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

    // Conferindo se retornou com sucesso antes de utilizar
    if (!worldLayer) {
      throw new Error(
        "WorldLayer não retornado por map.createLayer"
      )
    } else if (!aboveLayer) {
      throw new Error(
        "belowLayer não retornado por map.createLayer"
      )
    }

    aboveLayer.setDepth(10);
    worldLayer.setCollisionByProperty({ collides: true });


    // -------- Sempre que quiser ver as colisões atuais, descomente: -------
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
      .sprite(this.gs.player.x, this.gs.player.y, "dude");
      //  .setCollideWorldBounds(true);

    // ================================ VIDA ================================
    const hp = this.gs.player.hp;
    // avisa o React do valor inicial
    EventBus.emit('hp:update', hp);
    this.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => {
        this.applyDamage(7);
      }
    });

    this.npc = this.physics.add.sprite(410, 310, 'assets', 'weirdsquare')
    this.physics.add.collider(this.npc, worldLayer)
    this.physics.add.collider(this.player, this.npc)

    // task: fazer toggle para trocar personagem entre cubo e cara do phaser

    this.physics.add.collider(this.player, worldLayer);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

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

  applyDamage(amount: number) {
    this.gs.player.hp = Math.max(0, this.gs.player.hp - amount);
    EventBus.emit('hp:update', this.gs.player.hp); // 👈 avisa o React a cada mudança
  }

  heal(amount: number) {
    this.gs.player.hp = Math.min(100, this.gs.player.hp + amount);
    EventBus.emit('hp:update', this.gs.player.hp); // 👈 avisa o React a cada mudança
  }

  update(_time: number, deltaMs: number) {
    // Move o jogador usando o corpo físico para que colisões funcionem
    if (!this.player || !this.player.body) return;

    // const speed = this.gs.player.speed;
    const speed = this.gs.player.speed;
    console.log("Essa é a velocidade:", speed)
    let vx = 0;
    let vy = 0;

    if (this.cursors.left?.isDown) {
      vx = -speed;
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right?.isDown){
      vx = speed;
      this.player.anims.play('right', true); //task: refatorar, tá feio esse tanto de if para fazer animação né
    } else if (this.cursors.up?.isDown && !this.cursors.left?.isDown && !this.cursors.right?.isDown){
      this.player.anims.play('right', true);
    } else if(this.cursors.down?.isDown && !this.cursors.left?.isDown && !this.cursors.right?.isDown) {
      this.player.anims.play('left', true);
    } else {
      this.player.anims.play('turn');
    }

    if (this.cursors.up?.isDown){ vy = -speed;}
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
