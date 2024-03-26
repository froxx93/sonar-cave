class OptionsSelection extends UIElement {
    constructor(gp, position, options) {
        super(gp, position);
        this.options = options;
        this.selected = 0;

        this.lastSwitchTime = 0;
    }

    update(now) {
        super.update(now);

        // handle controls
        this.gp.pressedKeys.forEach(k => {
            switch (k) {
                // case "a":
                // case "ArrowLeft":
                //     this.player.move(Direction.LEFT);
                //     break;
                // case "d":
                // case "ArrowRight":
                //     this.player.move(Direction.RIGHT);
                //     break;
                case "w":
                case "ArrowUp":
                    if (now - this.lastSwitchTime >= OptionsSelection.SWITCH_DELAY) {
                        this.lastSwitchTime = now;
                        this.selectPreviousOption();
                    }
                    break;
                case "s":
                case "ArrowDown":
                    if (now - this.lastSwitchTime >= OptionsSelection.SWITCH_DELAY) {
                        this.lastSwitchTime = now;
                        this.selectNextOption();
                    }
                    break;
                case " ":
                    this.enter();
                    break;
                default:
                    console.log(k);
            }
        });
    }

    draw() {
        const ctx = this.gp.ctx;

        ctx.fillStyle = "red";
        ctx.font="20px Verdana";
        ctx.textAlign="center";

        let optionCount = 0;
        this.options.forEach((o,k) => {
            ctx.save();
            let name = o.name;
            if (this.selected == k) {
                ctx.font="50px Verdana";
                name = "> " + o.name + " <";
            }
            ctx.fillText(name, this.position.x, this.position.y + optionCount*100 -50);
            ctx.restore();
            optionCount++;
        })
    }

    selectPreviousOption() {
        this.selected--;
        if (this.selected < 0) this.selected = this.options.length-1;
    }

    selectNextOption() {
        this.selected++;
        if (this.selected >= this.options.length) this.selected = 0;
    }

    enter() {
        this.options[this.selected].func();
    }
}
OptionsSelection.SWITCH_DELAY = 200;    // ms
