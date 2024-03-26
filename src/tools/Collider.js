class Collider {
    constructor(position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.stroke();
    }

    collides(collider) {
        if (this.position.x < collider.position.x + collider.width &&
            this.position.x + this.width > collider.position.x &&
            this.position.y < collider.position.y + collider.height &&
            this.height + this.position.y > collider.position.y
        ) {
            // collision detected!
            return true;
        } else {
            return false;
        }
    }
}
