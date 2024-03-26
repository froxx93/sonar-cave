class SoundWave extends GameObject {
    constructor(gp, birthTime) {
        super(gp, gp.player.getCenter());

        this.birthTime = birthTime;
        this.currentLifeTime = 0;

        this.gp.soundWaves.push(this);

        this.obstaclesHit = {};

        playSound("growl", 0.3);

        // consume score
        this.gp.score = Math.max(0, this.gp.score - 100);
    }

    update(now) {
        super.update(now);
        this.currentLifeTime = now - this.birthTime;
        this.radius = this.currentLifeTime * SoundWave.SPEED;

        // check for collisions with walls
        this.gp.getObstacles().forEach((o,k) => {
            if (this.obstaclesHit[k] == null) {
                this.obstaclesHit[k] = [];
            }
            const walls = o.walls;
            walls.forEach(w => {
                if (this.collides(w) && this.obstaclesHit[k].length < SoundWave.MAX_WALL_HITS_PER_OBSTACLE) {
                    w.hitTime = now;
                    if (this.obstaclesHit[k].length == 0) {
                        playSound("hit", 0.3);
                    }
                    this.obstaclesHit[k].push(w);
                }
            });
        });
    }

    draw() {
        const ctx = this.gp.ctx;

        const positionRelativeToCamera = Point.subtract(this.position, this.gp.camera.position);

        if (this.currentLifeTime < SoundWave.MAX_LIFE_TIME) {
            // alive

            // reduce opacity
            const currentFadeOutDuration = Math.max(this.currentLifeTime - (SoundWave.MAX_LIFE_TIME - SoundWave.FADE_OUT_DURATION), 0);
            const currentFadeOutFactor = 1 / SoundWave.FADE_OUT_DURATION * currentFadeOutDuration;
            ctx.globalAlpha = 1 - currentFadeOutFactor;

            // draw
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(positionRelativeToCamera.x, positionRelativeToCamera.y, this.radius, 0, 2*Math.PI);
            ctx.stroke();

            // reset opacity
            ctx.globalAlpha = 1;
        } else {
            // die
            const index = this.gp.soundWaves.indexOf(this);
            if (index != -1) {
                this.gp.soundWaves.splice(index, 1);
            }
        }
    }

    collides(wall) {
        const r = this.radius;
        const pc = this.position;   // position circle
        const p1 = wall.position;   // p1 of wall
        const p2 = wall.getEndPosition();   // p2 of wall
        if (Direction.isVertical(wall.direction)) {
            if (pc.distanceTo(p1) <= r) {
                // top circle
                return true;
            } else if (pc.distanceTo(p2) <= r) {
                // bottom circle
                return true;
            } else if (
                pc.y >= p1.y &&
                pc.y <= p2.y &&
                Math.abs(pc.x - p1.x) <= r
            ) {
                // middle part
                return true;
            } else {
                // no collision
                return false
            }
        } else {
            if (pc.distanceTo(p1) <= r) {
                // left circle
                return true;
            } else if (pc.distanceTo(p2) <= r) {
                // right circle
                return true;
            } else if (
                pc.x >= p1.x &&
                pc.x <= p2.x &&
                Math.abs(pc.y - p1.y) <= r
            ) {
                // middle part
                return true;
            } else {
                // no collision
                return false
            }
        }
    }
}
SoundWave.SPEED = 0.6; // px per ms
SoundWave.MAX_LIFE_TIME = 750;  // ms
SoundWave.FADE_OUT_DURATION = SoundWave.MAX_LIFE_TIME;  // ms
// SoundWave.FADE_OUT_DURATION = 250;  // ms
SoundWave.MIN_INTERVAL = 150;   // ms
// SoundWave.MIN_INTERVAL = 75;   // ms
SoundWave.MAX_WALL_HITS_PER_OBSTACLE = 2;
