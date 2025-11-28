import { GameScene } from "../scenes/GameScene";
import { EventBus } from '../EventBus'

export function setupLife(scene: GameScene){
    //usa gs, vai virar model
    // ================================ VIDA ================================
    const hp = scene.gs.player.hp;
    // avisa o React do valor inicial
    EventBus.emit('hp:update', hp);
    scene.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => {
        // scene.applyDamage(7);
        if (scene.gs.player.hp <= 0 && !scene.gs.player.isPlayerFrozen) {
          scene.freezePlayer('dead');
          scene.player.setTint(0x888888);
          // EventBus.emit('player:dead');
          scene.scene.launch('SpectatorUI', { main: scene });
          scene.scene.bringToTop('SpectatorUI');
        }
      }
    });

  }