class Obstacle extends GameObject {
    constructor(gp, position, width, height) {   // p1 is upper left corner, p2 is lower right corner
        const stageOffsetX = gp.stage.getWidth();
        const positionRelativeToStage = Point.add(position, new Point(stageOffsetX, 0));
        super(gp, positionRelativeToStage);

        this.width = width;
        this.height = height;

        this.collider = new Collider(positionRelativeToStage, width, height);

        this.walls = [
            new Wall(this.gp, positionRelativeToStage, Direction.DOWN, this.height),
            new Wall(this.gp, new Point(positionRelativeToStage.x + this.width, positionRelativeToStage.y), Direction.DOWN, this.height),
            new Wall(this.gp, positionRelativeToStage, Direction.RIGHT, this.width),
            new Wall(this.gp, new Point(positionRelativeToStage.x, positionRelativeToStage.y + this.height), Direction.RIGHT, this.width),
        ];
    }

    update(now) {
        super.update(now);
        this.walls.forEach(w => w.update(now));
    }

    draw() {
        const ctx = this.gp.ctx;

        this.walls.forEach(w => w.draw());

        // ctx.strokeStyle = "yellow";
        // ctx.lineWidth = 3;
        // ctx.beginPath();
        // ctx.moveTo(this.position.x, this.position.y);
        // ctx.lineTo(this.position.x + this.width, this.position.y);
        // ctx.lineTo(this.position.x + this.width, this.position.y + this.height);
        // ctx.lineTo(this.position.x, this.position.y + this.height);
        // ctx.lineTo(this.position.x, this.position.y);
        // ctx.stroke();
    }

    collides(soundWave) {
        const vx = soundWave.position.x - this.position.x;
        const vy = soundWave.position.y - this.position.y;

        if (vx > (this.width/2 + soundWave.radius)) return false;
        if (vy > (this.height/2 + soundWave.radius)) return false;

        if (vx <= (this.width/2)) return true;
        if (vy <= (this.height/2)) return true;

        const cornerDistance_sq = (vx - this.width/2)^2 + (vy - this.height/2)^2;

        return (cornerDistance_sq <= (soundWave.radius^2));
    }
}
