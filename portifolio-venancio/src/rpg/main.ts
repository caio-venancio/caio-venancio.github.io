import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';

// Jogo antigo:
// import { Game as MainGame } from './scenes/Game';
// Jogo Novo, arquivo errado:
// import { Rpg as MainGame } from './Game';
// Jogo Novo, arquivo certo:
import { GameScene as MainGame } from './scenes/GameScene';

import { MainMenu } from './scenes/MainMenu';
import SpectatorUI from './scenes/SpectatorScene'
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    // type: AUTO,
    // width: 1024,
    // height: 768,
    // parent: 'game-container',
    // backgroundColor: '#028af8',
    // scene: [
    //     Boot,
    //     Preloader,
    //     MainMenu,
    //     MainGame,
    //     GameOver
    // ]
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: [ MainGame, SpectatorUI],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 }, //top down game, so no gravity
            fps: 120,          // mais passos, menos túnel
            tileBias: 32       // ajuda na separação sprite vs tile
        }
    }
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
