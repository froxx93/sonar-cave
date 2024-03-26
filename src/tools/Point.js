class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    vectorTo(point) {
        const vx = Math.abs(this.x - point.x);
        const vy = Math.abs(this.y - point.y);

        return new Point(vx, vy);
    }

    distanceTo(point) {
        const vx = Math.abs(this.x - point.x);
        const vy = Math.abs(this.y - point.y);

        const distance = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));

        return distance;
    }

    hits(point, width, height) {
        return !(
            this.x < point.x ||
            this.x > point.x + width ||
            this.y < point.y ||
            this.y > point.y + height
        )
    }

    addVector(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}

Point.add = (p1, p2) => {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}
Point.subtract = (p1, p2) => {
    return new Point(p1.x - p2.x, p1.y - p2.y);
}
