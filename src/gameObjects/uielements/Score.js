class Score extends UIElement {
    constructor(gp, position) {
        super(gp, position)
    }

    draw() {
        const ctx = this.gp.ctx;

        ctx.fillStyle = "red";
        ctx.font="30px Verdana";
        ctx.textAlign="center";
        ctx.fillText(Math.ceil(this.gp.score), this.position.x, this.position.y);
    }
}
