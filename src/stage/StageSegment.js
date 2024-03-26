class StageSegment {
  constructor(gp, type) {
    this.gp = gp;
    this.type = type;

    this.width = 50; // px
    this.obstacles = [];
    switch (type) {
      case StageSegment.TYPE_START:
        // this.width = 1920;
        this.width = 960;
        break;
      case StageSegment.TYPE_1:
        this.width = 700;
        this.obstacles.push(new Obstacle(gp, new Point(200, 0), 100, 600));
        this.obstacles.push(new Obstacle(gp, new Point(500, 480), 100, 600));
        break;
      case StageSegment.TYPE_2:
        this.width = 700;
        this.obstacles.push(new Obstacle(gp, new Point(200, 680), 300, 100));
        this.obstacles.push(new Obstacle(gp, new Point(500, 680), 100, 400));
        break;
      case StageSegment.TYPE_3:
        this.width = 700;
        this.obstacles.push(new Obstacle(gp, new Point(200, 250), 200, 300));
        this.obstacles.push(new Obstacle(gp, new Point(600, 780), 100, 300));
        break;
      case StageSegment.TYPE_4:
        this.width = 2268;
        this.obstacles.push(new Obstacle(gp, new Point(216, 648), 216, 216));
        this.obstacles.push(new Obstacle(gp, new Point(756, 324), 216, 216));
        this.obstacles.push(new Obstacle(gp, new Point(1080, 972), 216, 108));
        this.obstacles.push(new Obstacle(gp, new Point(1404, 540), 216, 216));
        this.obstacles.push(new Obstacle(gp, new Point(1836, 108), 216, 216));
        break;
      case StageSegment.TYPE_5:
        this.width = 2052;
        this.obstacles.push(new Obstacle(gp, new Point(108, 0), 216, 216));
        this.obstacles.push(new Obstacle(gp, new Point(324, 0), 216, 432));
        this.obstacles.push(new Obstacle(gp, new Point(540, 0), 216, 648));
        this.obstacles.push(new Obstacle(gp, new Point(756, 0), 216, 648));
        this.obstacles.push(new Obstacle(gp, new Point(972, 0), 216, 432));
        this.obstacles.push(new Obstacle(gp, new Point(1188, 0), 216, 216));
        this.obstacles.push(new Obstacle(gp, new Point(1080, 972), 216, 108));
        this.obstacles.push(new Obstacle(gp, new Point(1296, 864), 216, 216));
        this.obstacles.push(new Obstacle(gp, new Point(1512, 972), 216, 108));
        break;
      case StageSegment.TYPE_6:
        this.width = 1620;
        this.obstacles.push(new Obstacle(gp, new Point(324, 0), 108, 648));
        this.obstacles.push(new Obstacle(gp, new Point(864, 648), 324, 216));
        this.obstacles.push(new Obstacle(gp, new Point(1512, 0), 108, 432));
        break;
      case StageSegment.TYPE_7:
        this.width = 1512;
        this.obstacles.push(new Obstacle(gp, new Point(324, 0), 108, 648));
        this.obstacles.push(new Obstacle(gp, new Point(432, 540), 324, 108));
        this.obstacles.push(new Obstacle(gp, new Point(1080, 324), 108, 108));
        this.obstacles.push(new Obstacle(gp, new Point(1188, 324), 108, 756));
        break;
      case StageSegment.TYPE_8:
        this.width = 1512;
        this.obstacles.push(new Obstacle(gp, new Point(540, 0), 1080, 216));
        break;
    }
  }

  update(now) {
    this.obstacles.forEach((s) => s.update(now));
  }

  draw() {
    this.obstacles.forEach((s) => s.draw());
  }
}
StageSegment.TYPE_START = "start";
StageSegment.TYPE_1 = 1;
StageSegment.TYPE_2 = 2;
StageSegment.TYPE_3 = 3;
StageSegment.TYPE_4 = 4;
StageSegment.TYPE_5 = 5;
StageSegment.TYPE_6 = 6;
StageSegment.TYPE_7 = 7;
StageSegment.TYPE_8 = 8;

StageSegment.RANDOM_SEGMENTS_POOL = [
  StageSegment.TYPE_1,
  StageSegment.TYPE_2,
  StageSegment.TYPE_3,
  StageSegment.TYPE_4,
  StageSegment.TYPE_5,
  StageSegment.TYPE_6,
  StageSegment.TYPE_7,
  StageSegment.TYPE_8,
];
