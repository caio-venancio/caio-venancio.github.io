//Cena principal de jogo
import { unfreezePlayer } from '../engine/unfreezePlayer';
import { setupMap } from '../engine/setupMap';
import { setupCamera } from '../engine/setupCamera';
import { setupAnimations } from '../engine/setupAnimations'
import { setupInput } from '../engine/setupInput';

//Tem que retirar depois por que é lógica
import { setupLife } from '../nonengine/setupLife';

import { GameState } from "../core/gamestate";
import { EventBus } from '../EventBus'
import { externalInput } from "../externalInput";

import { Scene } from 'phaser';

export class GameScene extends Scene {
  gs!: GameState;
  player!: Phaser.Physics.Arcade.Sprite;
  npc!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  background!: Phaser.GameObjects.Image;
  worldLayer!: Phaser.Tilemaps.TilemapLayer;
  belowLayer!: Phaser.Tilemaps.TilemapLayer;
  aboveLayer!: Phaser.Tilemaps.TilemapLayer;
  map: Phaser.Tilemaps.Tilemap;
  attackKey!: Phaser.Input.Keyboard.Key;

  private attacking = false;
  private lastAttackTime = 0;
  private attackCooldown = 300; // ms

  private facing: "left" | "right" | "up" | "down" = "down"; // direção atual

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

    // https://mastorak.itch.io/pixelart-swords-32x32 -> dá créditos algum dia
    this.load.spritesheet('sword', '/assets/sprites/swords-sheet.png', { frameWidth: 32, frameHeight: 32})
  }

  create() {
    setupMap(this)
    this.setupPhysicsAndColliders()
    setupAnimations(this);
    setupInput(this);
    setupCamera(this);

    // isto tem que vir da lógica, do servidor
    setupLife(this);

    this.attackKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private handleAttack(time: number) {
    if (this.attacking) return;
    if (!Phaser.Input.Keyboard.JustDown(this.attackKey)) return;

    // verifica cooldown
    if (time - this.lastAttackTime < this.attackCooldown) return;

    this.lastAttackTime = time;
    this.attacking = true;

    // animação opcional
    // this.player.play("attack", true);

    // cria hitbox
    this.createAttackHitbox();

    // termina o ataque depois de um tempinho (duração do golpe)
    this.time.delayedCall(150, () => {
      this.attacking = false;
    });
  }

  private createAttackHitbox() {
  //   const range = 32;

    const offsetX = 0;
    const offsetY = 0;

  //   switch (this.facing) {
  //     case "up":    offsetY = -range; break;
  //     case "down":  offsetY =  range; break;
  //     case "left":  offsetX = -range; break;
  //     case "right": offsetX =  range; break;
  //   }

    const sword = this.add.sprite(this.player.x + offsetX, this.player.y + offsetY, "sword");
    sword.setOrigin(0.5, 0.5);

  //   // se quiser rotacionar dependendo da direção
  //   if (this.facing === "left")  sword.setAngle(-90);
  //   if (this.facing === "right") sword.setAngle(90);
  //   if (this.facing === "up")    sword.setAngle(0);
  //   if (this.facing === "down")  sword.setAngle(180);

    // const hitbox = this.physics.add.existing(sword, false) as Phaser.Physics.Arcade.Body;
    // hitbox.setSize(32, 32);

  //   this.physics.add.overlap(
  //     sword,
  //     this.enemies,
  //     (_s, enemyObj) => {
  //       const enemy = enemyObj as Phaser.Physics.Arcade.Sprite;
  //       this.handleEnemyHit(enemy);
  //     },
  //     undefined,
  //     this
  //   );

    this.time.delayedCall(120, () => {
      sword.destroy();
    });
  }

  // private createAttackHitbox() {
    // const range = 32;    // distância à frente do player
    // const width = 32;    // largura do hitbox
    // const height = 32;   // altura do hitbox

    // let x = this.player.x;
    // let y = this.player.y;

    // switch (this.facing) {
    //   case "up":
    //     y -= range;
    //     break;
    //   case "down":
    //     y += range;
    //     break;
    //   case "left":
    //     x -= range;
    //     break;
    //   case "right":
    //     x += range;
    //     break;
    // }

    // const hitbox = this.physics.add
    //   .sprite(x, y, undefined as any) // sem textura, só hitbox
    //   .setSize(width, height)
    //   .setVisible(false); // invisível

    // // checa colisão com inimigos
    // this.physics.add.overlap(
    //   hitbox,
    //   this.enemies,
    //   (hitboxObj, enemyObj) => {
    //     const enemy = enemyObj as Phaser.Physics.Arcade.Sprite;
    //     this.handleEnemyHit(enemy);
    //   },
    //   undefined,
    //   this
    // );

    // // remove hitbox rapidinho
    // this.time.delayedCall(80, () => {
    //   hitbox.destroy();
    // });
  // }
  
  setupPhysicsAndColliders(){
    //usa gs, vai virar model

    //acho que estas linhas não eram aqui kkkk
    // 1) Estado lógico do jogo
    this.gs = new GameState();
    // 2) Sprite visual sincronizado com o estado
    // this.player = this.physics.add.sprite(this.gs.player.x, this.gs.player.y, "assets", "weirdsquare");
    this.player = this.physics.add
    .sprite(this.gs.player.x, this.gs.player.y, "dude");
    // inicializa estado a partir da posição física
    this.gs.player.x = this.player.x;
    this.gs.player.y = this.player.y;    
    //  .setCollideWorldBounds(true);
    this.npc = this.physics.add.sprite(410, 310, 'assets', 'weirdsquare')
    
    //estas são
    this.physics.add.collider(this.npc, this.worldLayer)
    this.physics.add.collider(this.player, this.npc, this.handleNpcCollision, undefined, this)
    // this.npc.setImmovable(true)
    // this.player.setImmovable(true)
    // this.player.setCollideWorldBounds(true)
    
    // task: fazer toggle para trocar personagem entre cubo e cara do phaser
    // this.player.setBodySize(32, 48, true)  
    this.physics.add.collider(this.player, this.worldLayer);
  }

  

  handleNpcCollision() {
    //usa gs, vai virar model
    if (!this.gs.player.invul) {
      this.gs.player.hp -= 25
      EventBus.emit('hp:update', this.gs.player.hp);
      console.log(`O player tomou 25 de dano! Vida atual: ${this.gs.player.hp}`)

      // ⚡ Efeito de empurrão (knockback) opcional:
      // const knockback = 100
      // if (player.x <= npc.x) {
      //   a.setVelocityX(knockback)
      // } else {
      //   a.setVelocityX(-knockback)
      // }

      // 🕒 Invulnerabilidade temporária:
      this.gs.player.invul = true
      this.time.delayedCall(1000, () => this.gs.player.invul = false) // 1 segundo

      // 🩸 Efeito visual opcional
      this.player.setTint(0xff0000)
      this.time.delayedCall(200, () => this.player.clearTint())

      // ☠️ Morte
      // if (this.gs.player.hp <= 0) {
      //   console.log("Player morreu!")
      //   player.setTint(0x000000)
      //   player.setVelocity(0)
      //   player.anims.play('death', true) // se tiver animação
      // }
    }
  }

  applyDamage(amount: number) {
    //usa gs, vai virar model
    this.gs.player.hp = Math.max(0, this.gs.player.hp - amount);
    EventBus.emit('hp:update', this.gs.player.hp); // 👈 avisa o React a cada mudança
  }

  heal(amount: number) {
    //usa gs, vai virar model
    this.gs.player.hp = Math.min(100, this.gs.player.hp + amount);
    EventBus.emit('hp:update', this.gs.player.hp); // 👈 avisa o React a cada mudança
  }

    // === Controle de congelamento ===
  freezePlayer(_reason?: 'dead' | 'menu') {
    //usa gs, vai virar model
    this.gs.player.isPlayerFrozen = true;

    // 1) zera movimento e animações
    this.player.setVelocity(0, 0);
    this.player.anims.play('turn');

    // 2) desabilita o corpo físico (sai do solver de colisão)
    (this.player.body as Phaser.Physics.Arcade.Body).enable = false;

    // 3) opcional: desabilitar teclado globalmente na cena
    // (faça isso só se não houver outros controláveis locais)
    // this.input.keyboard!.enabled = false;
  }

  update(_time: number, deltaMs: number) {
    this.updateAngryNpc();
    const isPlayerFrozen = this.gs.player.isPlayerFrozen;
    if (isPlayerFrozen) {
      this.player.setVelocity(0, 0);
      return;
    }
    this.updatePlayer(_time);
  }

  updatePlayer(time: number){
    //usa gs, vai virar model
    // Move o jogador usando o corpo físico para que colisões funcionem
    if (!this.player || !this.player.body) return;

    // const speed = this.gs.player.speed;
    const speed = this.gs.player.speed;
    console.log("Essa é a velocidade:", speed)
    let vx = 0;
    let vy = 0;
      
    if (this.cursors.left?.isDown || externalInput.left) {
      vx = -speed;
      this.player.anims.play('left', true);
      this.facing = "left";
    }
    else if (this.cursors.right?.isDown || externalInput.right){
      vx = speed;
      this.player.anims.play('right', true); //task: refatorar, tá feio esse tanto de if para fazer animação né
      this.facing = "right";
    } else if (this.cursors.up?.isDown && !this.cursors.left?.isDown && !this.cursors.right?.isDown || (externalInput.up)){
      this.player.anims.play('right', true);
      this.facing = "right";
    } else if(this.cursors.down?.isDown && !this.cursors.left?.isDown && !this.cursors.right?.isDown || (externalInput.down)) {
      this.player.anims.play('left', true);
      this.facing = "left";
    } else {
      this.player.anims.play('turn');
    }


    if (this.cursors.up?.isDown || externalInput.up){ vy = -speed; this.facing = "up";}
    else if (this.cursors.down?.isDown || externalInput.down) {vy = speed; this.facing = "down";}
    
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
      // aqui chamamos o ataque
    this.handleAttack(time);
  }

  updateAngryNpc(){
    //não usa gs, vai virar variável local
    if (this.npc && this.player) {
      const speed = 50
      const direction = new Phaser.Math.Vector2( 
        this.player.x - this.npc.x,
        this.player.y - this.npc.y
      ).normalize()

      this.npc.setVelocity(direction.x * speed, direction.y * speed)
    }
  }

  respawnAt(x: number, y: number) {
    //usa gs, vai virar variável model
    this.gs.player.hp = 100;
    this.player.setPosition(x, y);
    unfreezePlayer(this);
    this.cameras.main.startFollow(this.player);
    EventBus.emit('hp:update', this.gs.player.hp);
    this.player.clearTint();
  }
}
