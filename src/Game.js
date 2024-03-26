class Game {
    constructor() {
        this.cv = document.getElementById("canvas");
        this.cv.oncontextmenu = (e) => {
            // prevent the browser's right-click-popup-menu
            e.preventDefault();
        }

        this.dankMode = false;

        // start panel
        this.showMainMenu();

        // add controls
        window.addEventListener( "keydown", e => Control.keyDown(e, this.panel))
        window.addEventListener( "keyup", e => Control.keyUp(e, this.panel))

        this.run();
    }

    run() {
        requestAnimationFrame(() => this.run());

        const now = Date.now();

        switch (this.mode) {
            case Game.MODE_PAUSED_GAME:
                break;
            default:
                // do calculations
                this.panel.update(now);

                this.panel.draw();
                break;
        }
    }

    startGame() {
        const doneFunc = () => {
            // create game panel
            this.panel = new GamePanel(this);
        }

        loadResources(doneFunc, this.dankMode);
        this.mode = Game.MODE_RUNNING_GAME;
    }

    pauseGame() {
        this.mode = Game.MODE_PAUSED_GAME;
    }

    showMainMenu() {
        this.mode = Game.MODE_MAIN_MENU;

        this.panel = new StartScreenPanel(this);
    }
}
Game.MODE_RUNNING_GAME = "running game";
Game.MODE_PAUSED_GAME = "paused game";
Game.MODE_MAIN_MENU = "main menu";

Game.DANK_MODE = false;
// Game.DANK_MODE = true;
