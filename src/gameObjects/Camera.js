class Camera {
  constructor(gp, position) {
    this.gp = gp;
    this.position = position;
    this.speed = 1.5;
  }

  update(now) {
    this.position.addVector(new Point(this.speed, 0));

    // update score
    this.gp.score += this.speed;
  }
}
