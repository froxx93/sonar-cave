class Wall extends GameObject {
    constructor(gp, position, direction, length) {
        super(gp, position);

        this.direction = direction;
        this.length = length;

        this.hitTime = 0;
        this.opacity = 0;

        this.color = "#ffff00";
    }

    update(now) {
        const hitDuration = Math.min(now - this.hitTime,  Wall.VISIBLE_TIME);
        this.opacity = 1 - 1 / Wall.VISIBLE_TIME * hitDuration;

        if (this.gp.game.dankMode) {
            this.color = Color.nextOnRainbow(this.color);
            // console.log(this.color);
        }
    }

    draw() {
        const ctx = this.gp.ctx;

        const positionRelativeToCamera = Point.subtract(this.position, this.gp.camera.position);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = this.opacity;
        // ctx.globalAlpha = this.opacity+0.1;
        ctx.beginPath();
        ctx.moveTo(positionRelativeToCamera.x, positionRelativeToCamera.y);
        switch (this.direction) {
            // case Direction.LEFT:
            //     ctx.lineTo(positionRelativeToCamera.x - this.length, positionRelativeToCamera.y);
            //     break;
            case Direction.RIGHT:
                ctx.lineTo(positionRelativeToCamera.x + this.length, positionRelativeToCamera.y);
                break;
            // case Direction.UP:
            //     ctx.lineTo(positionRelativeToCamera.x, positionRelativeToCamera.y - this.length);
            //     break;
            case Direction.DOWN:
                ctx.lineTo(positionRelativeToCamera.x, positionRelativeToCamera.y + this.length);
                break;
            default:

        }
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    getEndPosition() {
        switch (this.direction) {
            case Direction.LEFT:
                return Point.add(this.position, new Point(-this.length, 0))
            case Direction.RIGHT:
                return Point.add(this.position, new Point(this.length, 0))
            case Direction.UP:
                return Point.add(this.position, new Point(0, -this.length));
            case Direction.DOWN:
                return Point.add(this.position, new Point(0, this.length));
        }
    }
}
Wall.VISIBLE_TIME = 1000;   // ms
