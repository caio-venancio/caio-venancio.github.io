// Representam players, seus dados e sua lógica

export class Player {
    constructor(public x = 0, public y = 0, public speed = 120){}
    hp = 100;
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

}