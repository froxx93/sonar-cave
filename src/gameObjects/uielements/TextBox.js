class TextBox extends UIElement {
    constructor(gp, position, text, fontSize) {
        super(gp, position);
        this.text = text;
        this.fontSize = fontSize;
    }

    draw() {
        const ctx = this.gp.ctx;

        ctx.fillStyle = "white";
        ctx.font = this.fontSize + "px Verdana";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}
