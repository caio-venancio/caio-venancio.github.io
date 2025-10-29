// Modelo de estado do jogo (domínio)
// Mundo Lógico do Jogo
// Nada de Phaser, sprites, áudio, teclado, nem timers da engine

// game.ts seria um Orquestrador da simulação
// Nada de Regras visuais, criação de sprites, leitura direta do teclado da engine

// ports.ts  seria Contratos de integração (Clock, RNG, Storage, Physics etc.)
// Nada de Implementações concretas (isso fica nos adapters da engine, ex.: Phaser)

// core/GameState.ts
// core/GameState.ts
import { Player } from "./entities/player";

export class GameState {
  player = new Player(721, 300, 150); // posição inicial + velocidade

  update(input: { up: boolean; down: boolean; left: boolean; right: boolean }, dt: number) {
    const dx = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const dy = (input.down  ? 1 : 0) - (input.up   ? 1 : 0);
    if (dx || dy) this.player.move(dx, dy, dt);
  }
}
