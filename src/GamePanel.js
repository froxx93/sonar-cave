class GamePanel {
    constructor(game) {
        this.game = game;
        this.cv = game.cv;
        this.ctx = this.cv.getContext("2d");

        const cvWidth = this.cv.width;
        const cvHeight = this.cv.height;

        this.pressedKeys = [];

        // this.camera = new Camera(this, new Point(cvWidth/2, cvHeight/2));
        this.camera = new Camera(this, new Point(0, 0));

        this.background = new Background(this);

        this.score = 0;

        this.stage = new Stage(this);

        this.soundWaves = [];

        const playerWidth = resources.player1.width;
        const playerHeight = resources.player1.height;
        const playerPosition = new Point((cvWidth - playerWidth) / 4, (cvHeight - playerHeight) / 2);
        this.player = new Player(this, playerPosition);

        this.ui = [
            new Score(this, new Point(this.cv.width/2, 50)),
        ]

        playSound("mainTheme", 0.8, true);
    }

    update(now) {
        // handle controls
        this.pressedKeys.forEach(k => {
            switch (k) {
                case "a":
                case "ArrowLeft":
                    this.player.move(Direction.LEFT);
                    break;
                case "d":
                case "ArrowRight":
                    this.player.move(Direction.RIGHT);
                    break;
                case "w":
                case "ArrowUp":
                    this.player.move(Direction.UP);
                    break;
                case "s":
                case "ArrowDown":
                    this.player.move(Direction.DOWN);
                    break;
                case " ":
                    let canGrowl = true;
                    const lastSoundWave = Array.last(this.soundWaves);
                    if (lastSoundWave) {
                        const lastSoundWaveBirthTime = lastSoundWave.birthTime;
                        const minIntervalExpired = now - lastSoundWaveBirthTime >= SoundWave.MIN_INTERVAL;
                        if (!minIntervalExpired) {
                            canGrowl = false;
                        }
                    }
                    if (canGrowl) {
                        this.player.growl(now);
                    }
                    break;
                default:
                    console.log(k);
            }
        });

        // update camera
        this.camera.update(now);

        // update objects
        this.background.update(now);

        this.soundWaves.forEach(o => o.update(now));

        this.stage.update(now);

        this.player.update(now);
    }

    draw() {
        // start with fresh canvas
        this.ctx.clearRect(0, 0, this.cv.width, this.cv.height);

        this.background.draw();

        // not needed because obstacles are invisible
        this.stage.draw();

        this.soundWaves.forEach(o => o.draw());

        this.player.draw();

        this.ui.forEach(e => e.draw());
    }

    getObstacles() {
        return this.stage.getObstacles();
    }
}
