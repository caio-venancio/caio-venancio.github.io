// functions.ts
import Phaser from 'phaser';
import { GameState } from "../core/gamestate";

export function unfreezePlayer(scene: Phaser.Scene & { 
  player: Phaser.Physics.Arcade.Sprite;
  gs: GameState; // substitua por seu tipo GameState se tiver
}) {
  // 1) reabilita o corpo físico
  const body = scene.player.body as Phaser.Physics.Arcade.Body;
  body.enable = true;
  scene.player.setVelocity(0, 0); // garante partida do repouso

  // 2) reabilita input se você tiver desativado globalmente
  // scene.input.keyboard!.enabled = true;

  // 3) atualiza flag do GameState
  scene.gs.player.isPlayerFrozen = false;
}