class Stage {
    constructor(gp) {
        this.gp = gp;

        this.spool = [];
        this.spool.push(new StageSegment(gp, StageSegment.TYPE_START));
    }

    update(now) {
        this.spool.forEach(s => s.update(now));

        const cameraEndPositionX = this.gp.camera.position.x + 1920;
        while (this.getWidth() <= cameraEndPositionX) {
            this.addRandomSegment();
        }
    }

    draw() {
        this.spool.forEach(s => s.draw());
    }

    getObstacles() {
        return Array.flatten(this.spool.map(s => s.obstacles));
    }

    getWidth() {
        const widthList = this.spool.map(s => s.width);
        // console.log(widthList);
        const width = widthList.reduce((a, b) => a + b);

        return width;
    }

    addRandomSegment() {
        const segmentId = Math.randomInt(0, StageSegment.RANDOM_SEGMENTS_POOL.length-1);
        const type = StageSegment.RANDOM_SEGMENTS_POOL[segmentId];

        this.spool.push(new StageSegment(this.gp, type));
    }
}
