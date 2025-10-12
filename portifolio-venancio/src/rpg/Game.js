import { EventBus } from './EventBus';
import { Scene } from 'phaser';

// export class Game extends Scene
// {
//     camera: Phaser.Cameras.Scene2D.Camera;
//     background: Phaser.GameObjects.Image;
//     gameText: Phaser.GameObjects.Text;

//     constructor ()
//     {
//         super('Game');
//     }

//     create ()
//     {
//         this.camera = this.cameras.main;
//         this.camera.setBackgroundColor(0x00ff00);

//         this.background = this.add.image(512, 384, 'background');
//         this.background.setAlpha(0.5);

//         this.gameText = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
//             fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
//             stroke: '#000000', strokeThickness: 8,
//             align: 'center'
//         }).setOrigin(0.5).setDepth(100);

//         EventBus.emit('current-scene-ready', this);
//     }

//     changeScene ()
//     {
//         this.scene.start('GameOver');
//     }
// }

export class Rpg extends Scene
{
    constructor(){

        super({ key: 'rpg' });

        this.player = null;
        this.cursors = null;
        this.speed = 150;

    }
    // constructor ()
    // {
    //     super({ key: 'breakout' });

    //     this.bricks;
    //     this.paddle;
    //     this.ball;
    // }

    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.atlas('assets', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
    }

    create(){
        this.player = this.physics.add.sprite(400, 350, 'assets', 'weirdsquare')
        //  Our colliders
        //  Input events

         this.cursors = this.input.keyboard.createCursorKeys();

    }

    // create ()
    // {
    //     //  Enable world bounds, but disable the floor
    //     this.physics.world.setBoundsCollision(true, true, true, false);

    //     //  Create the bricks in a 10x6 grid
    //     this.bricks = this.physics.add.staticGroup({
    //         key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
    //         frameQuantity: 10,
    //         gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
    //     });

    //     this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
    //     this.ball.setData('onPaddle', true);

    //     this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

    //     //  Our colliders
    //     this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    //     this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    //     //  Input events
    //     this.input.on('pointermove', function (pointer)
    //     {

    //         //  Keep the paddle within the game
    //         this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

    //         if (this.ball.getData('onPaddle'))
    //         {
    //             this.ball.x = this.paddle.x;
    //         }

    //     }, this);

    //     this.input.on('pointerup', function (pointer)
    //     {

    //         if (this.ball.getData('onPaddle'))
    //         {
    //             this.ball.setVelocity(-75, -300);
    //             this.ball.setData('onPaddle', false);
    //         }

    //     }, this);
    // }

    // hitBrick (ball, brick)
    // {
    //     brick.disableBody(true, true);

    //     if (this.bricks.countActive() === 0)
    //     {
    //         this.resetLevel();
    //     }
    // }

    // resetBall ()
    // {
    //     this.ball.setVelocity(0);
    //     this.ball.setPosition(this.paddle.x, 500);
    //     this.ball.setData('onPaddle', true);
    // }

    // resetLevel ()
    // {
    //     this.resetBall();

    //     this.bricks.children.each(brick =>
    //     {

    //         brick.enableBody(false, 0, 0, true, true);

    //     });
    // }

    // hitPaddle (ball, paddle)
    // {
    //     let diff = 0;

    //     if (ball.x < paddle.x)
    //     {
    //         //  Ball is on the left-hand side of the paddle
    //         diff = paddle.x - ball.x;
    //         ball.setVelocityX(-10 * diff);
    //     }
    //     else if (ball.x > paddle.x)
    //     {
    //         //  Ball is on the right-hand side of the paddle
    //         diff = ball.x - paddle.x;
    //         ball.setVelocityX(10 * diff);
    //     }
    //     else
    //     {
    //         //  Ball is perfectly in the middle
    //         //  Add a little random X to stop it bouncing straight up!
    //         ball.setVelocityX(2 + Math.random() * 8);
    //     }
    // }

    update (time, delta){
    //     if (this.ball.y > 600)
    //     {
    //         this.resetBall();
    //     }
        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(this.speed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(this.speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(this.speed);
    }
}

// https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game#bouncing-bombs
// https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6

// Em jogo 2d top-down, é melhor a camera se movimentar com o personagem ou a camera carregar por tamanho?
// Qual a estrutura das fases de desenvolvimento?
// Tem como fazer core para separar do phaser?