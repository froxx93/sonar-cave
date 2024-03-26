class StartScreenPanel {
    constructor(game) {
        this.game = game;
        this.cv = game.cv;
        this.ctx = this.cv.getContext("2d");

        const cvWidth = this.cv.width;
        const cvHeight = this.cv.height;

        this.pressedKeys = [];

        this.options = [
            {name: "Normal", func: () => {this.game.dankMode = false;this.game.startGame()}},
            {name: "xX_d4nk_4$$et$_MLG_360_n0$c0pe_m0de_Xx", func: () => {this.game.dankMode = true;this.game.startGame()}},
        ]

        this.ui = [
            new TextBox(this, new Point(this.cv.width/2, 200), "Sonar Cave", 100),
            new OptionsSelection(this, new Point(this.cv.width/2, this.cv.height/2), this.options),
        ]
    }

    update(now) {
        this.ui.forEach(e => e.update(now));
    }

    draw() {
        const ctx = this.ctx;
        // start with fresh canvas
        ctx.clearRect(0, 0, this.cv.width, this.cv.height);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.cv.width, this.cv.height);

        this.ui.forEach(e => e.draw());
    }
}
