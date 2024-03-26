class Animation {
    constructor(sprites = [], duration = 1000) {
        this.sprites = sprites;
        this.duration = duration;
    }

    getActiveSprite(now) {
        if (this.sprites != null) {
            const currentLoopRunningFor = now % this.duration;
            const percentageProgress = 100 / this.duration * currentLoopRunningFor;
            const activeSpriteId = (Math.max(1, Math.ceil(this.sprites.length / 100 * percentageProgress))) - 1;
            const activeSprite = this.sprites[activeSpriteId];

            return activeSprite;
        } else {
            return null;
        }
    }
}
