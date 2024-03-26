class Player extends GameObject {
    constructor(gp, position) {
        super(gp, position);

        this.animation = new Animation([
            resources.player1,
            resources.player2,
            resources.player1,
            resources.player3,
        ], 500);

        const activeSprite = this.animation.sprites[0];
        this.collider = new Collider(this.position, activeSprite.width, activeSprite.height);

        this.speed = 7;

        this.isAlive = true;
    }

    update(now) {
        super.update(now);

        // can't leave camera view
        const pos = this.position;
        const camPos = this.gp.camera.position;
        if (pos.x < camPos.x) {
            pos.x = camPos.x
        } else if (pos.x + this.activeSprite.width > camPos.x + this.gp.cv.width) {
            pos.x = camPos.x + this.gp.cv.width - this.activeSprite.width;
        }
        if (pos.y < camPos.y) {
            pos.y = camPos.y
        } else if (pos.y + this.activeSprite.height > camPos.y + this.gp.cv.height) {
            pos.y = camPos.y + this.gp.cv.height - this.activeSprite.height;
        }

        const collidingObstacles = this.gp.getObstacles().filter(o => this.collider.collides(o.collider));
        if (collidingObstacles.length > 0) {
            // player collided with obstacle

            this.die();
            // highlight whole colliding obstacles
            collidingObstacles.forEach(o => o.walls.forEach(w => {
                w.hitTime = now;
                // yeah, this is a freaking hell of a solution, but it works, so what
                w.update(now);
                w.draw();
            }));
        }
    }

    draw() {
        super.draw();

        // this.collider.draw(this.gp.ctx);
    }

    growl(now) {
        new SoundWave(this.gp, now);
    }

    die() {
        if (this.isAlive) {
            this.isAlive = false;
            console.log("dead");
            // this.gp.player = null;
            stopAllSounds();
            playSound("die", 0.5);

            this.gp.game.pauseGame();
        }
    }
}
