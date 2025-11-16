// Representam players, seus dados e sua lógica
export class Player {
    x: number;
    y: number;
    speed: number;
    hp: number = 100;
    isPlayerFrozen: boolean = false;

    constructor(x: number, y: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    invul = false;
    inventory: string[] = [];

    // move(dx: number, dy: number){
    //     this.x += dx;
    //     this.y += dy;
    // }

    move(dx: number, dy: number, dt: number) {
        // normaliza para não andar mais rápido na diagonal
        const len = Math.hypot(dx, dy) || 1;
        this.x += (dx / len) * this.speed * dt;
        this.y += (dy / len) * this.speed * dt;
    }

    takeDamage(amount: number, knockback?: Phaser.Math.Vector2){
        if (!this.invul || this.hp <= 0) return;
        this.hp = Math.max(0, this.hp - amount);

        this.invul = true;

        // if (knockback){
        //     this.setVelocity(knockback.x, knockback.y);
        // }
        if (this.hp === 0){
            this.die();
        }
    }

    die(){
        this.speed = 0;
    }
}