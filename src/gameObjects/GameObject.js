class GameObject {
    constructor(gp, position = new Point(0, 0)) {
        this.gp = gp;
        this.position = position;

        this.speed = 1;

        this.vx = 0;
        this.vy = 0;

        this.animation = null;
        this.activeSprite = null;

        this.collider = null;
    }

    update(now) {
        this.activeSprite = this.animation != null ? this.animation.getActiveSprite(now) : null;

        const vOversizeFactor = this.position.distanceTo(new Point(this.position.x + this.vx, this.position.y + this.vy));
        if (vOversizeFactor != 0) {
            this.vx /= vOversizeFactor;
            this.vy /= vOversizeFactor;
        }

        this.position.x += this.vx * this.speed;
        this.vx = 0;
        this.position.y += this.vy * this.speed;
        this.vy = 0;
    }

    draw() {
        const ctx = this.gp.ctx;

        const positionRelativeToCamera = Point.subtract(this.position, this.gp.camera.position);

        if (this.activeSprite != null) {
            ctx.drawImage(this.activeSprite, positionRelativeToCamera.x, positionRelativeToCamera.y);
        }
    }

    getCenter() {
        if (this.activeSprite != null) {
            const x = this.position.x + this.activeSprite.width/2;
            const y = this.position.y + this.activeSprite.height/2;

            return new Point(x, y);
        } else {
            return this.position;
        }
    }

    move(direction) {
        switch (direction) {
            case Direction.LEFT:
                this.vx = -1;
                break;
            case Direction.RIGHT:
                this.vx = 1;
                break;
            case Direction.UP:
                this.vy = -1;
                break;
            case Direction.DOWN:
                this.vy = 1;
                break;
        }
    }
}
