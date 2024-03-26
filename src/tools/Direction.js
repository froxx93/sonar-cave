class Direction {};
Direction.LEFT = "left";
Direction.RIGHT = "right";
Direction.UP = "up";
Direction.DOWN = "down";

Direction.isVertical = (direction) => {
    if (direction == Direction.UP || direction == Direction.DOWN) {
        return true;
    } else {
        return false;
    }
}
