class Background extends GameObject {
    constructor(gp) {
        super(gp);
    }

    update(now) {
        super.update(now);
    }

    draw() {
        const ctx = this.gp.ctx;
        const canvas = ctx.canvas;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
}
