import { GameScene } from "../scenes/GameScene";
import { GameState } from "../core/gamestate"


export function setupPhysicsAndColliders(scene: GameScene){
    //usa gs, vai virar model

    //acho que estas linhas não eram aqui kkkk
    // 1) Estado lógico do jogo
    scene.gs = new GameState();
    // 2) Sprite visual sincronizado com o estado
    // this.player = this.physics.add.sprite(this.gs.player.x, this.gs.player.y, "assets", "weirdsquare");
    scene.player = scene.physics.add
    .sprite(scene.gs.player.x, scene.gs.player.y, "dude");
    // inicializa estado a partir da posição física
    scene.gs.player.x = scene.player.x;
    scene.gs.player.y = scene.player.y;    
    //  .setCollideWorldBounds(true);
    scene.npc = scene.physics.add.sprite(410, 310, 'assets', 'weirdsquare')
    
    //estas são
    scene.physics.add.collider(scene.npc, scene.worldLayer)
    scene.physics.add.collider(scene.player, scene.npc, scene.handleNpcCollision, undefined, scene)
    // this.npc.setImmovable(true)
    // this.player.setImmovable(true)
    // this.player.setCollideWorldBounds(true)
    
    // task: fazer toggle para trocar personagem entre cubo e cara do phaser
    // this.player.setBodySize(32, 48, true)  
    scene.physics.add.collider(scene.player, scene.worldLayer);
  }

